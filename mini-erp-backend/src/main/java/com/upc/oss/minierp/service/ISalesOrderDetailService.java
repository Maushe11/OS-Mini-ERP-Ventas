package com.upc.oss.minierp.service;

import com.upc.oss.minierp.dto.request.AddDetailRequestDto;
import com.upc.oss.minierp.dto.request.UpdateDetailRequestDto;
import com.upc.oss.minierp.dto.response.SalesOrderDetailResponseDto;

public interface ISalesOrderDetailService {

    SalesOrderDetailResponseDto addDetail(Long orderId, AddDetailRequestDto dto);

    SalesOrderDetailResponseDto updateDetail(Long orderId, Long detailId, UpdateDetailRequestDto dto);

    void deleteDetail(Long orderId, Long detailId);
}
