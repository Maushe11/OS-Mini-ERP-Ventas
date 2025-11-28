package com.upc.oss.minierp.service;

import com.upc.oss.minierp.dto.UserRequestDto;
import com.upc.oss.minierp.dto.UserResponseDto;

import java.util.List;

public interface IUserService {
    List<UserResponseDto> findAll();

    UserResponseDto findById(Long id);

    UserResponseDto create(UserRequestDto dto);

    UserResponseDto update(Long id, UserRequestDto dto);

    void delete(Long id);
}
