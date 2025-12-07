package com.upc.oss.minierp.service.impl;

import com.upc.oss.minierp.dto.request.OrderDetailRequestDto;
import com.upc.oss.minierp.dto.request.OrderRequestDto;
import com.upc.oss.minierp.dto.response.SalesOrderListDto;
import com.upc.oss.minierp.dto.response.SalesOrderResponseDto;
import com.upc.oss.minierp.entity.*;
import com.upc.oss.minierp.mapper.SalesOrderMapper;
import com.upc.oss.minierp.repository.CustomerRepository;
import com.upc.oss.minierp.repository.ProductRepository;
import com.upc.oss.minierp.repository.SalesOrderRepository;
import com.upc.oss.minierp.security.jwt.JwtUtil;
import com.upc.oss.minierp.service.ISalesOrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SalesOrderServiceImp implements ISalesOrderService {

    private final SalesOrderRepository orderRepo;
    private final CustomerRepository customerRepo;
    private final ProductRepository productRepo;
    private final SalesOrderMapper orderMapper;
    private final JwtUtil jwtUtil;

    @Transactional
    @Override
    public SalesOrderResponseDto createOrder(OrderRequestDto dto) {

        CustomerEntity customer = customerRepo.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        UserEntity user = jwtUtil.getLoggedUser();

        SalesOrderEntity order = new SalesOrderEntity();
        order.setCustomer(customer);
        order.setUser(user);
        order.setStatus("REGISTRADO");
        order.setDate(LocalDateTime.now());
        order.setTotal(BigDecimal.ZERO);

        BigDecimal total = BigDecimal.ZERO;

        for (OrderDetailRequestDto d : dto.getDetails()) {

            ProductEntity product = productRepo.findById(d.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

            if (Boolean.FALSE.equals(product.getActive())) {
                throw new RuntimeException("Producto inactivo: " + product.getName());
            }

            if (d.getQuantity() > product.getStock()) {
                throw new RuntimeException("Stock insuficiente: " + product.getName());
            }

            BigDecimal price = product.getPrice();
            BigDecimal subtotal = price.multiply(BigDecimal.valueOf(d.getQuantity()));

            SalesOrderDetailEntity detail = new SalesOrderDetailEntity();
            detail.setOrder(order);
            detail.setProduct(product);
            detail.setQuantity(d.getQuantity());
            detail.setPrice(price);
            detail.setSubtotal(subtotal);

            order.getDetails().add(detail);
            total = total.add(subtotal);

            product.setStock(product.getStock() - d.getQuantity());
            productRepo.save(product);
        }

        order.setTotal(total);

        return orderMapper.toDto(orderRepo.save(order));

    }

    @Override
    public SalesOrderResponseDto findById(Long id) {

        SalesOrderEntity order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        SalesOrderResponseDto dto = orderMapper.toDto(order);
        dto.setDetails(
                order.getDetails()
                        .stream()
                        .map(orderMapper::toDetailDto)
                        .toList()
        );

        return dto;
    }

    @Transactional
    @Override
    public void delete(Long id) {

        SalesOrderEntity order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        if (!"REGISTRADO".equals(order.getStatus())) {
            throw new RuntimeException("Solo se pueden eliminar órdenes en estado REGISTRADO");
        }

        for (SalesOrderDetailEntity detail : order.getDetails()) {
            ProductEntity product = detail.getProduct();
            Integer newStock = product.getStock() + detail.getQuantity();
            product.setStock(newStock);
            productRepo.save(product);
        }

        orderRepo.delete(order);
    }

    @Override
    public Page<SalesOrderListDto> search(String filter, int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());

        Page<SalesOrderEntity> result =
                orderRepo.findByCustomerNameContainingIgnoreCaseOrUserUsernameContainingIgnoreCase(
                        filter, filter, pageable
                );

        return result.map(orderMapper::toListDto);
    }
}
