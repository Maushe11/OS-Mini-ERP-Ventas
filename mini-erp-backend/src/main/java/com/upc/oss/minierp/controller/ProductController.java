package com.upc.oss.minierp.controller;

import com.upc.oss.minierp.dto.request.ProductRequestDto;
import com.upc.oss.minierp.dto.response.ProductResponseDto;
import com.upc.oss.minierp.service.IProductService;
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
@RequestMapping("/product")
@RequiredArgsConstructor
@Tag(name = "Productos", description = "Endpoints para la gestión gestión de productos")
public class ProductController {

    private final IProductService productService;

    @Operation(summary = "Listar productos")
    @ApiResponse(responseCode = "200", description = "Lista obtenida")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<ProductResponseDto>> list() {
        return ResponseEntity.ok(productService.listAll());
    }

    @Operation(summary = "Buscar producto por ID")
    @ApiResponse(responseCode = "200", description = "Producto encontrado")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @Operation(summary = "Registrar producto")
    @ApiResponse(responseCode = "200", description = "Producto creado")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PostMapping
    public ResponseEntity<ProductResponseDto> create(@Valid @RequestBody ProductRequestDto dto) {
        return ResponseEntity.ok(productService.create(dto));
    }

    @Operation(summary = "Actualizar producto")
    @ApiResponse(responseCode = "200", description = "Producto actualizado")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto> update(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequestDto dto) {
        return ResponseEntity.ok(productService.update(id, dto));
    }

    @Operation(
            summary = "Buscar productos",
            description = "Permite buscar productos por nombre o descripción. Incluye paginación."
    )
    @ApiResponse(responseCode = "200", description = "Resultados obtenidos correctamente")
    @ApiResponse(responseCode = "403", description = "Acceso denegado")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponseDto>> search(
            @Parameter(description = "Texto a buscar (nombre o descripción)")
            @RequestParam String filter,
            @Parameter(description = "Número de página (inicia en 0)")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Cantidad de registros por página")
            @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Campo por el cual ordenar")
            @RequestParam(defaultValue = "name") String sortBy
    ) {
        return ResponseEntity.ok(productService.search(filter, page, size, sortBy));
    }

}
