package com.upc.oss.minierp.dto.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DashboardSummaryDto {

    private long totalOrders;
    private long totalInvoices;
    private long totalCustomers;
    private BigDecimal totalSales;

}
