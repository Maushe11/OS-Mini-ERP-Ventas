package com.upc.oss.minierp.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class SalesOrderListDto {

    private Long idOrder;
    private String customerName;
    private String userName;
    private LocalDateTime date;
    private BigDecimal total;
    private String status;
}
