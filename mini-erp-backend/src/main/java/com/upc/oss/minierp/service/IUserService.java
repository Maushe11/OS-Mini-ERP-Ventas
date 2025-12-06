package com.upc.oss.minierp.service;

import com.upc.oss.minierp.dto.request.UserCreateRequestDto;
import com.upc.oss.minierp.dto.request.UserUpdateRequestDto;
import com.upc.oss.minierp.dto.response.UserResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IUserService {

    UserResponseDto create(UserCreateRequestDto dto);

    UserResponseDto update(Long id, UserUpdateRequestDto dto);

    List<UserResponseDto> findAll();

    UserResponseDto findById(Long id);

    void delete(Long id);

    Page<UserResponseDto> search(String filter, int page, int size, String sortBy);
}
