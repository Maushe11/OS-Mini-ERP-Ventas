package com.upc.oss.minierp.service;

import com.upc.oss.minierp.dto.request.ProductRequestDto;
import com.upc.oss.minierp.dto.response.ProductResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IProductService {

    ProductResponseDto create(ProductRequestDto dto);

    ProductResponseDto update(Long id, ProductRequestDto dto);

    ProductResponseDto findById(Long id);

    List<ProductResponseDto> listAll();

    Page<ProductResponseDto> search(String filter, int page, int size, String sortBy);

}
