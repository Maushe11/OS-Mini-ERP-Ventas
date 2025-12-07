package com.upc.oss.minierp.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "invoice")
@Data
public class InvoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idInvoice;

    @OneToOne(optional = false)
    @JoinColumn(name = "order_id")
    private SalesOrderEntity order;

    private String type; // BOLETA | FACTURA

    private String number; // F001-000001

    private LocalDateTime date = LocalDateTime.now();

    private BigDecimal total;
}
