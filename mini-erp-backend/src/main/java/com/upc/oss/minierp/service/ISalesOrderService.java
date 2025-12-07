package com.upc.oss.minierp.service;

import com.upc.oss.minierp.dto.request.OrderRequestDto;
import com.upc.oss.minierp.dto.response.SalesOrderListDto;
import com.upc.oss.minierp.dto.response.SalesOrderResponseDto;
import org.springframework.data.domain.Page;

public interface ISalesOrderService {

    SalesOrderResponseDto createOrder(OrderRequestDto dto);

    SalesOrderResponseDto findById(Long id);

    void delete(Long id);

    Page<SalesOrderListDto> search(String filter, int page, int size, String sortBy);
}
