package com.upc.oss.minierp.controller;

import com.upc.oss.minierp.dto.request.UserCreateRequestDto;
import com.upc.oss.minierp.dto.request.UserUpdateRequestDto;
import com.upc.oss.minierp.dto.response.UserResponseDto;
import com.upc.oss.minierp.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<UserResponseDto> create(@Valid @RequestBody UserCreateRequestDto dto) {
        return ResponseEntity.ok(userService.create(dto));
    }

    @Operation(
            summary = "Actualizar usuario",
            description = "Actualiza los datos del usuario especificado por su ID. Solo para administradores."
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> update(@PathVariable Long id,
                                                  @Valid @RequestBody UserUpdateRequestDto dto) {
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

    @Operation(
            summary = "Buscar usuarios",
            description = "Permite buscar usuarios por username. Incluye paginación."
    )
    @ApiResponse(responseCode = "200", description = "Resultados obtenidos correctamente")
    @ApiResponse(responseCode = "403", description = "Acceso denegado")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/search")
    public ResponseEntity<Page<UserResponseDto>> search(
            @Parameter(description = "Texto a buscar (username)")
            @RequestParam String filter,
            @Parameter(description = "Número de página (inicia en 0)")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Cantidad de registros por página")
            @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Campo por el cual ordenar")
            @RequestParam(defaultValue = "name") String sortBy
    ) {
        return ResponseEntity.ok(userService.search(filter, page, size, sortBy));
    }
}
