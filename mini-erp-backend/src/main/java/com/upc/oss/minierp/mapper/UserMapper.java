package com.upc.oss.minierp.mapper;

import com.upc.oss.minierp.dto.request.UserCreateRequestDto;
import com.upc.oss.minierp.dto.request.UserUpdateRequestDto;
import com.upc.oss.minierp.dto.response.UserResponseDto;
import com.upc.oss.minierp.entity.UserEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Named("toDto")
    UserResponseDto toDto(UserEntity user);

    @IterableMapping(qualifiedByName = "toDto")
    List<UserResponseDto> toDtoList(List<UserEntity> users);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true)
    })
    UserEntity toEntity(UserCreateRequestDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", expression = "java(java.time.LocalDateTime.now())")
    })
    void updateEntityFromDto(UserUpdateRequestDto dto, @MappingTarget UserEntity entity);
}
