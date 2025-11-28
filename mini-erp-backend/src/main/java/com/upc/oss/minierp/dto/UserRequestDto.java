package com.upc.oss.minierp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequestDto {

    @NotBlank(message = "El username es obligatorio")
    @Size(min = 3, max = 50, message = "El username debe tener entre 3 y 50 caracteres")
    private String username;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, max = 120, message = "La contraseña debe tener mínimo 6 caracteres")
    private String password;

    @NotBlank(message = "El rol es obligatorio")
    private String role;

    private boolean active;
}
