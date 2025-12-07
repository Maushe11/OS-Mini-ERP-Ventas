package com.upc.oss.minierp.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDto {

    @NotNull(message = "El cliente es obligatorio")
    private Long customerId;

    @NotEmpty(message = "Debe incluir al menos un producto en el pedido")
    @Valid
    private List<OrderDetailRequestDto> details;

}
