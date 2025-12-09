package com.upc.oss.minierp.controller;

import com.upc.oss.minierp.dto.response.DashboardSummaryDto;
import com.upc.oss.minierp.dto.response.MonthlySalesDto;
import com.upc.oss.minierp.service.IDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final IDashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardSummaryDto getSummary() {
        return dashboardService.getSummary();
    }

    @GetMapping("/monthly-sales")
    public List<MonthlySalesDto> getMonthlySales() {
        return dashboardService.getMonthlySales();
    }

}
