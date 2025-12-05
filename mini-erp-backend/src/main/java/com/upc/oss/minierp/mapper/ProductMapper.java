package com.upc.oss.minierp.mapper;

import com.upc.oss.minierp.dto.request.ProductRequestDto;
import com.upc.oss.minierp.dto.response.ProductResponseDto;
import com.upc.oss.minierp.entity.ProductEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductResponseDto toDto(ProductEntity entity);

    ProductEntity toEntity(ProductRequestDto dto);

    void updateEntityFromDto(ProductRequestDto dto, @MappingTarget ProductEntity entity);

}
