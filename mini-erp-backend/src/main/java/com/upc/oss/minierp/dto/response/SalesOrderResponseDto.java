package com.upc.oss.minierp.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class SalesOrderResponseDto {
    private Long idOrder;

    private String customerName;
    private String userName;

    private LocalDateTime date;
    private BigDecimal total;
    private String status;

    private List<SalesOrderDetailResponseDto> details;
}
