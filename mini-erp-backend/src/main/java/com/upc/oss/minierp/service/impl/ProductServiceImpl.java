package com.upc.oss.minierp.service.impl;

import com.upc.oss.minierp.dto.request.ProductRequestDto;
import com.upc.oss.minierp.dto.response.ProductResponseDto;
import com.upc.oss.minierp.entity.ProductEntity;
import com.upc.oss.minierp.mapper.ProductMapper;
import com.upc.oss.minierp.repository.ProductRepository;
import com.upc.oss.minierp.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public ProductResponseDto create(ProductRequestDto dto) {

        if (productRepository.existsByNameIgnoreCase(dto.getName())) {
            throw new RuntimeException("El nombre del producto ya existe");
        }

        if (dto.getPrice() == null || dto.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("El precio debe ser mayor a 0");
        }

        ProductEntity entity = productMapper.toEntity(dto);
        entity = productRepository.save(entity);
        return productMapper.toDto(entity);
    }

    @Override
    public ProductResponseDto update(Long id, ProductRequestDto dto) {

        ProductEntity entity = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (dto.getPrice() == null || dto.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("El precio debe ser mayor a 0");
        }

        if (dto.getStock() < 0 || dto.getMinStock() < 0) {
            throw new RuntimeException("El stock no puede ser negativo");
        }

        if (!entity.getName().equalsIgnoreCase(dto.getName()) &&
                productRepository.existsByNameIgnoreCase(dto.getName())) {
            throw new RuntimeException("El nombre del producto ya existe");
        }

        productMapper.updateEntityFromDto(dto, entity);

        ProductEntity updated = productRepository.save(entity);
        return productMapper.toDto(updated);
    }

    @Override
    public ProductResponseDto findById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public List<ProductResponseDto> listAll() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toDto)
                .toList();
    }

    @Override
    public Page<ProductResponseDto> search(String filter, int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        Page<ProductEntity> result =
                productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                        filter,
                        filter,
                        pageable
                );

        return result.map(productMapper::toDto);
    }

}
