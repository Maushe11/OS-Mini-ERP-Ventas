package com.upc.oss.minierp.service;

import com.upc.oss.minierp.dto.response.DashboardSummaryDto;
import com.upc.oss.minierp.dto.response.MonthlySalesDto;
import com.upc.oss.minierp.dto.response.ProductRankingDto;
import com.upc.oss.minierp.dto.response.TopCustomerDto;

import java.util.List;

public interface IDashboardService {

    DashboardSummaryDto getSummary();

    List<ProductRankingDto> getProductRanking();

    List<TopCustomerDto> getTopCustomers();

    List<MonthlySalesDto> getMonthlySales();

}
