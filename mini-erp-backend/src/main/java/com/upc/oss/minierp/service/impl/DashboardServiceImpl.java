package com.upc.oss.minierp.service.impl;

import com.upc.oss.minierp.dto.response.DashboardSummaryDto;
import com.upc.oss.minierp.dto.response.MonthlySalesDto;
import com.upc.oss.minierp.dto.response.ProductRankingDto;
import com.upc.oss.minierp.dto.response.TopCustomerDto;
import com.upc.oss.minierp.repository.CustomerRepository;
import com.upc.oss.minierp.repository.InvoiceRepository;
import com.upc.oss.minierp.repository.SalesOrderDetailRepository;
import com.upc.oss.minierp.repository.SalesOrderRepository;
import com.upc.oss.minierp.service.IDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements IDashboardService {

    private final SalesOrderRepository salesOrderRepository;
    private final SalesOrderDetailRepository salesOrderDetailRepository;
    private final CustomerRepository customerRepository;


    @Override
    public DashboardSummaryDto getSummary() {

        DashboardSummaryDto dto = new DashboardSummaryDto();

        dto.setTotalToday(salesOrderRepository.getTotalToday());
        dto.setTotalWeek(salesOrderRepository.getTotalThisWeek());
        dto.setTotalMonth(salesOrderRepository.getTotalThisMonth());

        dto.setOrdersToday(salesOrderRepository.getOrdersToday());
        dto.setOrdersWeek(salesOrderRepository.getOrdersThisWeek());
        dto.setOrdersMonth(salesOrderRepository.getOrdersThisMonth());

        return dto;
    }

    @Override
    public List<ProductRankingDto> getProductRanking() {
        return salesOrderDetailRepository.getProductRanking();
    }

    @Override
    public List<TopCustomerDto> getTopCustomers() {
        return customerRepository.getTopCustomers();
    }

    @Override
    public List<MonthlySalesDto> getMonthlySales() {
        return salesOrderRepository.getMonthlySales();
    }
}
