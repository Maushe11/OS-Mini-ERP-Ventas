package com.upc.oss.minierp.mapper;

import com.upc.oss.minierp.dto.request.CustomerRequestDto;
import com.upc.oss.minierp.dto.response.CustomerResponseDto;
import com.upc.oss.minierp.entity.CustomerEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;


@Mapper(componentModel = "spring")
public interface CustomerMapper {

    CustomerResponseDto toDto(CustomerEntity entity);

    CustomerEntity toEntity(CustomerRequestDto dto);

    void updateEntityFromDto(CustomerRequestDto dto, @MappingTarget CustomerEntity entity);

    List<CustomerResponseDto> toDtoList(List<CustomerEntity> entities);
}
