package com.upc.oss.minierp.service.impl;

import com.upc.oss.minierp.dto.request.InvoiceRequestDto;
import com.upc.oss.minierp.dto.response.InvoiceResponseDto;
import com.upc.oss.minierp.entity.InvoiceEntity;
import com.upc.oss.minierp.entity.SalesOrderEntity;
import com.upc.oss.minierp.repository.InvoiceRepository;
import com.upc.oss.minierp.repository.SalesOrderRepository;
import com.upc.oss.minierp.service.IInvoiceService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements IInvoiceService {

    private final SalesOrderRepository orderRepo;
    private final InvoiceRepository invoiceRepo;

    @Transactional
    @Override
    public InvoiceResponseDto generateInvoice(Long orderId, InvoiceRequestDto dto) {

        // 1) Obtener orden
        SalesOrderEntity order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        // 2) Validar estado
        if (!order.getStatus().equals("REGISTRADO")) {
            throw new RuntimeException("La orden ya fue facturada o no está en estado REGISTRADO");
        }

        // 3) Generar número del comprobante
        String number = generateNextNumber(dto.getType());

        // 4) Crear entidad invoice
        InvoiceEntity invoice = new InvoiceEntity();
        invoice.setOrder(order);
        invoice.setType(dto.getType());
        invoice.setNumber(number);
        invoice.setDate(LocalDateTime.now());
        invoice.setTotal(order.getTotal());

        invoiceRepo.save(invoice);

        // 5) Cambiar estado
        order.setStatus("FACTURADO");
        orderRepo.save(order);

        // 6) Devolver respuesta
        InvoiceResponseDto response = new InvoiceResponseDto();
        response.setIdInvoice(invoice.getIdInvoice());
        response.setOrderId(order.getIdOrder());
        response.setType(invoice.getType());
        response.setNumber(invoice.getNumber());
        response.setTotal(invoice.getTotal());
        response.setDate(invoice.getDate());

        return response;
    }

    // ---------------------------------------------------------------
    // GENERACIÓN DE SERIE + CORRELATIVO
    // ---------------------------------------------------------------
    private String generateNextNumber(String type) {

        // Serie depende del tipo
        String series = type.equalsIgnoreCase("FACTURA") ? "F001" : "B001";

        // Buscar último número generado
        String lastNumber = invoiceRepo.findLastNumberByType(type);

        int correlativo = 1;

        if (lastNumber != null) {
            String[] parts = lastNumber.split("-");
            correlativo = Integer.parseInt(parts[1]) + 1;
        }

        return series + "-" + String.format("%06d", correlativo);
    }
}
