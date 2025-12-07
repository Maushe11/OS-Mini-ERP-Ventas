package com.upc.oss.minierp.service.impl;

import com.upc.oss.minierp.dto.request.AddDetailRequestDto;
import com.upc.oss.minierp.dto.request.UpdateDetailRequestDto;
import com.upc.oss.minierp.dto.response.SalesOrderDetailResponseDto;
import com.upc.oss.minierp.entity.ProductEntity;
import com.upc.oss.minierp.entity.SalesOrderDetailEntity;
import com.upc.oss.minierp.entity.SalesOrderEntity;
import com.upc.oss.minierp.mapper.SalesOrderMapper;
import com.upc.oss.minierp.repository.ProductRepository;
import com.upc.oss.minierp.repository.SalesOrderDetailRepository;
import com.upc.oss.minierp.repository.SalesOrderRepository;
import com.upc.oss.minierp.service.ISalesOrderDetailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class SalesOrderDetailServiceImpl implements ISalesOrderDetailService {

    private final SalesOrderRepository orderRepo;
    private final SalesOrderDetailRepository detailRepo;
    private final ProductRepository productRepo;
    private final SalesOrderMapper mapper;

    // -------------------------------------------------
    // 1) AGREGAR DETALLE
    // -------------------------------------------------
    @Transactional
    @Override
    public SalesOrderDetailResponseDto addDetail(Long orderId, AddDetailRequestDto dto) {

        SalesOrderEntity order = getOrderIfModifiable(orderId);

        ProductEntity product = productRepo.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (Boolean.FALSE.equals(product.getActive())) {
            throw new RuntimeException("Producto inactivo");
        }

        if (dto.getQuantity() > product.getStock()) {
            throw new RuntimeException("Stock insuficiente para " + product.getName());
        }

        // 1) descontar stock
        product.setStock(product.getStock() - dto.getQuantity());

        // 2) crear detalle
        SalesOrderDetailEntity detail = new SalesOrderDetailEntity();
        detail.setOrder(order);
        detail.setProduct(product);
        detail.setQuantity(dto.getQuantity());
        detail.setPrice(product.getPrice());
        detail.setSubtotal(product.getPrice().multiply(BigDecimal.valueOf(dto.getQuantity())));

        order.getDetails().add(detail);

        // 3) recalcular total
        order.setTotal(order.getDetails().stream()
                .map(SalesOrderDetailEntity::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        productRepo.save(product);
        orderRepo.save(order);

        return mapper.toDetailDto(detail);
    }

    // -------------------------------------------------
    // 2) EDITAR DETALLE (cambiar cantidad)
    // -------------------------------------------------
    @Transactional
    @Override
    public SalesOrderDetailResponseDto updateDetail(Long orderId, Long detailId, UpdateDetailRequestDto dto) {

        SalesOrderEntity order = getOrderIfModifiable(orderId);
        SalesOrderDetailEntity detail = getDetailFromOrder(orderId, detailId);

        ProductEntity product = detail.getProduct();

        int oldQty = detail.getQuantity();
        int newQty = dto.getQuantity();

        // 1) restaurar stock anterior
        product.setStock(product.getStock() + oldQty);

        // 2) verificar stock suficiente
        if (newQty > product.getStock()) {
            throw new RuntimeException("Stock insuficiente para " + product.getName());
        }

        // 3) descontar nueva cantidad
        product.setStock(product.getStock() - newQty);

        // 4) actualizar detalle
        detail.setQuantity(newQty);
        detail.setSubtotal(detail.getPrice().multiply(BigDecimal.valueOf(newQty)));

        // 5) recalcular total orden
        order.setTotal(order.getDetails().stream()
                .map(SalesOrderDetailEntity::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        productRepo.save(product);
        orderRepo.save(order);
        detailRepo.save(detail);

        return mapper.toDetailDto(detail);
    }

    // -------------------------------------------------
    // 3) ELIMINAR DETALLE
    // -------------------------------------------------
    @Transactional
    @Override
    public void deleteDetail(Long orderId, Long detailId) {

        SalesOrderEntity order = getOrderIfModifiable(orderId);
        SalesOrderDetailEntity detail = getDetailFromOrder(orderId, detailId);

        ProductEntity product = detail.getProduct();

        // 1) restaurar stock
        product.setStock(product.getStock() + detail.getQuantity());

        // 2) quitar detalle de la orden
        order.getDetails().remove(detail);

        // 3) recalcular total
        order.setTotal(order.getDetails().stream()
                .map(SalesOrderDetailEntity::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        productRepo.save(product);
        detailRepo.delete(detail);
        orderRepo.save(order);
    }

    // -------------------------------------------------
    // HELPERS
    // -------------------------------------------------

    private SalesOrderEntity getOrderIfModifiable(Long orderId) {

        SalesOrderEntity order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        if (!"REGISTRADO".equals(order.getStatus())) {
            throw new RuntimeException("Solo se pueden modificar órdenes en estado REGISTRADO");
        }

        return order;
    }

    private SalesOrderDetailEntity getDetailFromOrder(Long orderId, Long detailId) {

        SalesOrderDetailEntity detail = detailRepo.findById(detailId)
                .orElseThrow(() -> new RuntimeException("Detalle no encontrado"));

        if (!detail.getOrder().getIdOrder().equals(orderId)) {
            throw new RuntimeException("El detalle no pertenece a esta orden");
        }

        return detail;
    }
}
