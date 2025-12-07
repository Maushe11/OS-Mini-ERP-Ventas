package com.upc.oss.minierp.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderDetailRequestDto {

    @NotNull(message = "El producto es obligatorio")
    private Long productId;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser mayor o igual a 1")
    private Integer quantity;

}
