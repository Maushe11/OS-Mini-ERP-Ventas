package com.upc.oss.minierp.service.impl;

import com.upc.oss.minierp.dto.request.UserCreateRequestDto;
import com.upc.oss.minierp.dto.request.UserUpdateRequestDto;
import com.upc.oss.minierp.dto.response.UserResponseDto;
import com.upc.oss.minierp.entity.UserEntity;
import com.upc.oss.minierp.mapper.UserMapper;
import com.upc.oss.minierp.repository.UserRepository;
import com.upc.oss.minierp.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
        return userMapper.toDtoList(userRepository.findAll());
    }

    @Override
    public UserResponseDto findById(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return userMapper.toDto(user);
    }

    @Override
    public UserResponseDto create(UserCreateRequestDto dto) {
        UserEntity user = userMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        userRepository.save(user);
        return userMapper.toDto(user);
    }

    @Override
    public UserResponseDto update(Long id, UserUpdateRequestDto dto) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        userMapper.updateEntityFromDto(dto, user);

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        userRepository.save(user);
        return userMapper.toDto(user);
    }

    @Override
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        userRepository.deleteById(id);
    }

    @Override
    public Page<UserResponseDto> search(String filter, int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        Page<UserEntity> result =
                userRepository.findByUsernameContainingIgnoreCase(
                        filter,
                        pageable
                );

        return result.map(userMapper::toDto);
    }
}
