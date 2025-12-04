package com.upc.oss.minierp.controller;

import com.upc.oss.minierp.dto.request.UserRequestDto;
import com.upc.oss.minierp.dto.response.UserResponseDto;
import com.upc.oss.minierp.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "Usuarios", description = "Endpoints para la gestión de usuarios del sistema")
public class UserController {

    private final IUserService userService;

    @Operation(
            summary = "Listar usuarios",
            description = "Devuelve la lista completa de usuarios registrados en el sistema. Solo disponible para administradores."
    )
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> listAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @Operation(
            summary = "Obtener usuario por ID",
            description = "Retorna la información del usuario correspondiente al ID proporcionado. Solo disponible para administradores."
    )
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @Operation(
            summary = "Crear usuario",
            description = "Permite registrar un nuevo usuario en el sistema. Solo para administradores."
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<UserResponseDto> create(@Valid @RequestBody UserRequestDto dto) {
        return ResponseEntity.ok(userService.create(dto));
    }

    @Operation(
            summary = "Actualizar usuario",
            description = "Actualiza los datos del usuario especificado por su ID. Solo para administradores."
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> update(@PathVariable Long id,
                                                  @Valid @RequestBody UserRequestDto dto) {
        return ResponseEntity.ok(userService.update(id, dto));
    }

    @Operation(
            summary = "Eliminar usuario",
            description = "Elimina un usuario según su ID. Solo disponible para administradores."
    )
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
