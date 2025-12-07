package com.upc.oss.minierp.mapper;

import com.upc.oss.minierp.dto.response.SalesOrderDetailResponseDto;
import com.upc.oss.minierp.dto.response.SalesOrderListDto;
import com.upc.oss.minierp.dto.response.SalesOrderResponseDto;
import com.upc.oss.minierp.entity.SalesOrderDetailEntity;
import com.upc.oss.minierp.entity.SalesOrderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SalesOrderMapper {

    // Para la tabla
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "user.username", target = "userName")
    SalesOrderListDto toListDto(SalesOrderEntity e);

    // Para el detalle
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "user.username", target = "userName")
    SalesOrderResponseDto toDto(SalesOrderEntity e);

    @Mapping(source = "product.name", target = "productName")
    SalesOrderDetailResponseDto toDetailDto(SalesOrderDetailEntity d);

}
