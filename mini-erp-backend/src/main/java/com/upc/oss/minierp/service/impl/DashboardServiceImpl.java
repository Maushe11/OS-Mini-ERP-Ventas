package com.upc.oss.minierp.service.impl;

import com.upc.oss.minierp.dto.response.DashboardSummaryDto;
import com.upc.oss.minierp.dto.response.MonthlySalesDto;
import com.upc.oss.minierp.repository.CustomerRepository;
import com.upc.oss.minierp.repository.InvoiceRepository;
import com.upc.oss.minierp.repository.SalesOrderRepository;
import com.upc.oss.minierp.service.IDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements IDashboardService {

    private final SalesOrderRepository salesOrderRepository;
    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;

    @Override
    public DashboardSummaryDto getSummary() {
        DashboardSummaryDto dto = new DashboardSummaryDto();

        dto.setTotalOrders(salesOrderRepository.count());
        dto.setTotalInvoices(invoiceRepository.count());
        dto.setTotalCustomers(customerRepository.count());

        BigDecimal totalSales = invoiceRepository.getTotalSales();
        dto.setTotalSales(totalSales != null ? totalSales : BigDecimal.ZERO);

        return dto;
    }

    @Override
    public List<MonthlySalesDto> getMonthlySales() {
        List<Object[]> rows = invoiceRepository.findMonthlySales();
        List<MonthlySalesDto> result = new ArrayList<>();

        for (Object[] row : rows) {
            Integer month = ((Number) row[0]).intValue();
            BigDecimal total = (BigDecimal) row[1];
            result.add(new MonthlySalesDto(month, total));
        }

        return result;
    }
}
