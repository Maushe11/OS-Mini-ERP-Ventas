package com.upc.oss.minierp.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CustomerRequestDto {

    @NotBlank(message = "El documento es obligatorio")
    @Size(max = 20, message = "Máximo 20 caracteres")
    private String document;

    @NotBlank(message = "El nombre o razón social es obligatorio")
    @Size(max = 100, message = "Máximo 100 caracteres")
    private String name;

    @Email(message = "Debe ingresar un correo válido")
    private String email;

    @Size(max = 15, message = "Máximo 15 caracteres")
    private String phone;

    @Size(max = 200, message = "Máximo 200 caracteres")
    private String address;
}
