package com.upc.oss.minierp.service;

import com.upc.oss.minierp.dto.request.CustomerRequestDto;
import com.upc.oss.minierp.dto.response.CustomerResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ICustomerService {

    CustomerResponseDto create(CustomerRequestDto dto);

    CustomerResponseDto update(Long id, CustomerRequestDto dto);

    CustomerResponseDto findById(Long id);

    List<CustomerResponseDto> listAll();

    void delete(Long id);

    Page<CustomerResponseDto> search(String filter, int page, int size, String sortBy);
}
