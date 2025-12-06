package com.upc.oss.minierp.dto.response;

import lombok.Data;

@Data
public class CustomerResponseDto {

    private Long id;
    private String document;
    private String name;
    private String email;
    private String phone;
    private String address;

}
