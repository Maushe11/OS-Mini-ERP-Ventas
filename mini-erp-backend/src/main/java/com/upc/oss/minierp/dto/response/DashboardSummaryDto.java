package com.upc.oss.minierp.dto.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DashboardSummaryDto {
    private BigDecimal totalToday;
    private BigDecimal totalWeek;
    private BigDecimal totalMonth;

    private Long ordersToday;
    private Long ordersWeek;
    private Long ordersMonth;
}
