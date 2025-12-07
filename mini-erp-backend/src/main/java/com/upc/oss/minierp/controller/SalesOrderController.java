package com.upc.oss.minierp.controller;

import com.upc.oss.minierp.dto.request.OrderRequestDto;
import com.upc.oss.minierp.dto.response.SalesOrderListDto;
import com.upc.oss.minierp.dto.response.SalesOrderResponseDto;
import com.upc.oss.minierp.service.ISalesOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@Tag(name = "Órdenes de Venta", description = "Endpoints para gestionar órdenes de venta")
public class SalesOrderController {

    private final ISalesOrderService service;

    @Operation(
            summary = "Buscar órdenes",
            description = "Permite buscar órdenes por el nombre del cliente o usuario registrador. Retorna resultados paginados."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de órdenes obtenida satisfactoriamente"),
            @ApiResponse(responseCode = "401", description = "No autorizado"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/search")
    public ResponseEntity<Page<SalesOrderListDto>> search(
            @RequestParam String filter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "date") String sortBy
    ) {
        return ResponseEntity.ok(service.search(filter, page, size, sortBy));
    }

    @Operation(
            summary = "Registrar una nueva orden de venta",
            description = "Registra una orden de venta con sus respectivos detalles. Valida stock y existencia de productos."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Orden registrada exitosamente",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "idOrder": 12,
                                      "customerName": "Juan Pérez",
                                      "userName": "admin",
                                      "date": "2025-01-12T10:32:00",
                                      "total": 150.50,
                                      "status": "REGISTRADO",
                                      "details": [
                                        {
                                          "idDetail": 1,
                                          "productName": "Laptop Lenovo",
                                          "quantity": 1,
                                          "price": 150.50,
                                          "subtotal": 150.50
                                        }
                                      ]
                                    }
                                    """))),
            @ApiResponse(responseCode = "400", description = "Error de validación"),
            @ApiResponse(responseCode = "401", description = "No autorizado")
    })
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PostMapping
    public ResponseEntity<SalesOrderResponseDto> create(@Valid @RequestBody OrderRequestDto dto) {
        return ResponseEntity.ok(service.createOrder(dto));
    }

    @Operation(
            summary = "Obtener detalle completo de una orden",
            description = "Muestra información completa de la orden, incluyendo el listado de detalles."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Orden encontrada"),
            @ApiResponse(responseCode = "404", description = "Orden no encontrada"),
            @ApiResponse(responseCode = "401", description = "No autorizado")
    })
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<SalesOrderResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @Operation(
            summary = "Eliminar una orden",
            description = "Elimina una orden solo si se encuentra en estado REGISTRADO. Restaura el stock de los productos involucrados."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Orden eliminada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Orden no puede eliminarse en su estado actual"),
            @ApiResponse(responseCode = "404", description = "Orden no encontrada"),
            @ApiResponse(responseCode = "401", description = "No autorizado")
    })
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
