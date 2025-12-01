package com.upc.oss.minierp.service;

import com.upc.oss.minierp.dto.request.CustomerRequestDto;
import com.upc.oss.minierp.dto.response.CustomerResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ICustomerService {

    List<CustomerResponseDto> listAll();

    CustomerResponseDto findById(Long id);

    CustomerResponseDto create(CustomerRequestDto dto);

    CustomerResponseDto update(Long id, CustomerRequestDto dto);

    void delete(Long id);

    Page<CustomerResponseDto> search(String filter, int page, int size, String sortBy);
}
