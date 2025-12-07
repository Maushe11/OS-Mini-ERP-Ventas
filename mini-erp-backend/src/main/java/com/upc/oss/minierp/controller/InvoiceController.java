package com.upc.oss.minierp.controller;

import com.upc.oss.minierp.dto.request.InvoiceRequestDto;
import com.upc.oss.minierp.dto.response.InvoiceResponseDto;
import com.upc.oss.minierp.service.IInvoiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order/{orderId}/invoice")
@RequiredArgsConstructor
@Tag(name = "Facturación", description = "Generación de comprobantes de venta")
public class InvoiceController {

    private final IInvoiceService invoiceService;

    @Operation(
            summary = "Generar comprobante de venta",
            description = """
                    Genera Boleta o Factura para la orden indicada.
                    Reglas:
                    - La orden debe estar en estado REGISTRADO.
                    - Se genera número automático (serie + correlativo).
                    - La orden cambia a estado FACTURADO.
                    - Se almacena en la tabla INVOICE.
                    """
    )
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PostMapping
    public ResponseEntity<InvoiceResponseDto> generate(
            @PathVariable Long orderId,
            @Valid @RequestBody InvoiceRequestDto dto
    ) {
        return ResponseEntity.ok(invoiceService.generateInvoice(orderId, dto));
    }

}
