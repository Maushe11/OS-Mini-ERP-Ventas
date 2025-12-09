package com.upc.oss.minierp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class MonthlySalesDto {

    private int month;        // 1 = enero, 2 = febrero, ...
    private BigDecimal total; // Total vendido en ese mes

}
