package com.upc.oss.minierp.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class InvoiceResponseDto {

    private Long idInvoice;
    private String type;
    private String number;
    private LocalDateTime date;
    private BigDecimal total;
    private Long orderId;

}
