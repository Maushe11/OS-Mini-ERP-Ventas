package com.upc.oss.minierp.dto.response;

import lombok.Data;

@Data
public class ProductResponseDto {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private Integer minStock;
    private Boolean active;

}
