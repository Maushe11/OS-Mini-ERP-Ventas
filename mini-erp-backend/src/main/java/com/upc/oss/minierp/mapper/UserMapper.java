package com.upc.oss.minierp.mapper;

import com.upc.oss.minierp.dto.request.UserRequestDto;
import com.upc.oss.minierp.dto.response.UserResponseDto;
import com.upc.oss.minierp.entity.UserEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDto toDto(UserEntity user);

    List<UserResponseDto> toDtoList(List<UserEntity> users);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true)
    })
    UserEntity toEntity(UserRequestDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "password", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true)
    })
    void updateEntityFromDto(UserRequestDto dto, @MappingTarget UserEntity entity);
}
