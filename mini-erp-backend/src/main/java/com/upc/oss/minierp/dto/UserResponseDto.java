package com.upc.oss.minierp.dto;

import lombok.Data;

@Data
public class UserResponseDto {
    private Long id;
    private String username;
    private String role;
    private boolean active;
    private String createdAt;
    private String updatedAt;
}
