package com.upc.oss.minierp.dto.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class SalesOrderDetailResponseDto {

    private Long idDetail;
    private String productName;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal subtotal;

}
