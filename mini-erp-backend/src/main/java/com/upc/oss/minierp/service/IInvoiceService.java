package com.upc.oss.minierp.service;

import com.upc.oss.minierp.dto.request.InvoiceRequestDto;
import com.upc.oss.minierp.dto.response.InvoiceResponseDto;

public interface IInvoiceService {

    InvoiceResponseDto generateInvoice(Long orderId, InvoiceRequestDto dto);

}
