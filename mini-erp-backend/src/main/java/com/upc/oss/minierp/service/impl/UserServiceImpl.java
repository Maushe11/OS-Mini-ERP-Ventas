package com.upc.oss.minierp.service.impl;

import com.upc.oss.minierp.dto.UserRequestDto;
import com.upc.oss.minierp.dto.UserResponseDto;
import com.upc.oss.minierp.entity.UserEntity;
import com.upc.oss.minierp.mapper.UserMapper;
import com.upc.oss.minierp.repository.UserRepository;
import com.upc.oss.minierp.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserResponseDto> findAll() {
        return userMapper.toResponseList(userRepository.findAll());
    }

    @Override
    public UserResponseDto findById(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return userMapper.toResponse(user);
    }

    @Override
    public UserResponseDto create(UserRequestDto dto) {
        UserEntity user = userMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        userRepository.save(user);
        return userMapper.toResponse(user);
    }

    @Override
    public UserResponseDto update(Long id, UserRequestDto dto) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        userMapper.updateEntityFromDto(dto, user);

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        userRepository.save(user);
        return userMapper.toResponse(user);
    }

    @Override
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        userRepository.deleteById(id);
    }
}
