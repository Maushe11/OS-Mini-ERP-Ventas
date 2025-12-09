package com.upc.oss.minierp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardKpiDto {

    private Long totalOrders;
    private Long totalInvoices;
    private Long totalCustomers;
    private BigDecimal totalSales;

}
