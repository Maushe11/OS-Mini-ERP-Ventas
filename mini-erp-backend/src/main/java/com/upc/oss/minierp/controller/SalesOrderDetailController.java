package com.upc.oss.minierp.controller;

import com.upc.oss.minierp.dto.request.AddDetailRequestDto;
import com.upc.oss.minierp.dto.request.UpdateDetailRequestDto;
import com.upc.oss.minierp.dto.response.SalesOrderDetailResponseDto;
import com.upc.oss.minierp.service.ISalesOrderDetailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders/{orderId}/details")
@RequiredArgsConstructor
@Tag(name = "Detalles de Orden", description = "Endpoints para gestionar los detalles de una orden de venta")
public class SalesOrderDetailController {

    private final ISalesOrderDetailService detailService;

    @Operation(
            summary = "Agregar un detalle a una orden",
            description = "Permite agregar un producto y su cantidad a una orden de venta. Valida stock, estado de la orden y la actividad del producto."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Detalle agregado exitosamente",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = """
                                    {
                                      "idDetail": 5,
                                      "productName": "Mouse Gamer",
                                      "quantity": 2,
                                      "price": 50.00,
                                      "subtotal": 100.00
                                    }
                                    """))),
            @ApiResponse(responseCode = "400", description = "Validación fallida o stock insuficiente"),
            @ApiResponse(responseCode = "401", description = "No autorizado"),
            @ApiResponse(responseCode = "404", description = "Orden o producto no encontrado")
    })
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PostMapping
    public ResponseEntity<SalesOrderDetailResponseDto> addDetail(
            @PathVariable Long orderId,
            @Valid @RequestBody AddDetailRequestDto dto) {

        return ResponseEntity.ok(detailService.addDetail(orderId, dto));
    }

    @Operation(
            summary = "Actualizar un detalle de la orden",
            description = "Permite cambiar la cantidad de un producto en una orden registrada. Restaura y recalcula stock correctamente."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Detalle actualizado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Cantidad inválida o stock insuficiente"),
            @ApiResponse(responseCode = "404", description = "Orden o detalle no encontrado"),
            @ApiResponse(responseCode = "401", description = "No autorizado")
    })
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PutMapping("/{detailId}")
    public ResponseEntity<SalesOrderDetailResponseDto> updateDetail(
            @PathVariable Long orderId,
            @PathVariable Long detailId,
            @Valid @RequestBody UpdateDetailRequestDto dto) {

        return ResponseEntity.ok(detailService.updateDetail(orderId, detailId, dto));
    }

    @Operation(
            summary = "Eliminar un detalle de la orden",
            description = "Elimina un detalle de la orden y restaura el stock del producto correspondiente."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Detalle eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Orden o detalle no encontrado"),
            @ApiResponse(responseCode = "401", description = "No autorizado")
    })
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @DeleteMapping("/{detailId}")
    public ResponseEntity<Void> deleteDetail(
            @PathVariable Long orderId,
            @PathVariable Long detailId) {

        detailService.deleteDetail(orderId, detailId);
        return ResponseEntity.noContent().build();
    }

}
