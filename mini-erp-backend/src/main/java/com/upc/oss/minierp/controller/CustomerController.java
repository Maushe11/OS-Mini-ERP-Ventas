package com.upc.oss.minierp.controller;

import com.upc.oss.minierp.dto.request.CustomerRequestDto;
import com.upc.oss.minierp.dto.response.CustomerResponseDto;
import com.upc.oss.minierp.service.ICustomerService;
import io.swagger.v3.oas.annotations.Operation;
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
@RequestMapping("/customer")
@RequiredArgsConstructor
@Tag(name = "Clientes", description = "Endpoints para la gestión de clientes del sistema")
public class CustomerController {

    private final ICustomerService customerService;

    @Operation(
            summary = "Listar todos los clientes",
            description = "Devuelve una lista completa de clientes registrados."
    )
    @ApiResponse(responseCode = "200", description = "Clientes obtenidos correctamente")
    @ApiResponse(responseCode = "401", description = "No autorizado")
    @ApiResponse(responseCode = "403", description = "Acceso denegado")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public ResponseEntity<List<CustomerResponseDto>> listAll() {
        return ResponseEntity.ok(customerService.listAll());
    }

    @Operation(
            summary = "Obtener cliente por ID",
            description = "Busca un cliente por su identificador único."
    )
    @ApiResponse(responseCode = "200", description = "Cliente encontrado")
    @ApiResponse(responseCode = "403", description = "Acceso denegado")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.findById(id));
    }

    @Operation(
            summary = "Registrar cliente",
            description = "Crea un nuevo cliente en el sistema."
    )
    @ApiResponse(responseCode = "200", description = "Cliente registrado correctamente")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @ApiResponse(responseCode = "403", description = "Acceso denegado")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping
    public ResponseEntity<CustomerResponseDto> create(@Valid @RequestBody CustomerRequestDto dto) {
        return ResponseEntity.ok(customerService.create(dto));
    }

    @Operation(
            summary = "Buscar clientes",
            description = "Permite buscar clientes por nombre o documento. Incluye paginación."
    )
    @ApiResponse(responseCode = "200", description = "Resultado de búsqueda")
    @ApiResponse(responseCode = "403", description = "Acceso denegado")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/search")
    public ResponseEntity<Page<CustomerResponseDto>> search(
            @RequestParam String filter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy
    ) {
        return ResponseEntity.ok(customerService.search(filter, page, size, sortBy));
    }

    @Operation(
            summary = "Actualizar cliente",
            description = "Modifica los datos de un cliente existente."
    )
    @ApiResponse(responseCode = "200", description = "Cliente actualizado correctamente")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @ApiResponse(responseCode = "403", description = "Acceso denegado")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponseDto> update(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequestDto dto
    ) {
        return ResponseEntity.ok(customerService.update(id, dto));
    }

    @Operation(
            summary = "Eliminar cliente",
            description = "Elimina un cliente por ID."
    )
    @ApiResponse(responseCode = "204", description = "Cliente eliminado correctamente")
    @ApiResponse(responseCode = "403", description = "Acceso denegado")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        customerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
