package com.upc.oss.minierp.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InvoiceRequestDto {

    @NotBlank(message = "El tipo de comprobante es obligatorio")
    private String type; // "BOLETA" o "FACTURA"

}
