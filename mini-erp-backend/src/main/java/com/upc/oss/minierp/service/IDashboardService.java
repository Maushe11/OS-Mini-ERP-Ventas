package com.upc.oss.minierp.service;

import com.upc.oss.minierp.dto.response.DashboardSummaryDto;
import com.upc.oss.minierp.dto.response.MonthlySalesDto;

import java.util.List;

public interface IDashboardService {

    DashboardSummaryDto getSummary();

    List<MonthlySalesDto> getMonthlySales();

}
