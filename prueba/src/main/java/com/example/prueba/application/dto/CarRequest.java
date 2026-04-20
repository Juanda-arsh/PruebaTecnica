package com.example.prueba.application.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CarRequest(
        @NotBlank(message = "La marca es obligatoria")
        @Size(max = 80, message = "La marca no puede superar 80 caracteres")
        String brand,

        @NotBlank(message = "El modelo es obligatorio")
        @Size(max = 80, message = "El modelo no puede superar 80 caracteres")
        String model,

        @NotNull(message = "El año es obligatorio")
        @Min(value = 1886, message = "El año debe ser mayor o igual a 1886")
        @Max(value = 2100, message = "El año no puede superar 2100")
        Integer year,

        @NotBlank(message = "La placa es obligatoria")
        @Size(max = 20, message = "La placa no puede superar 20 caracteres")
        String plate,

        @NotBlank(message = "El color es obligatorio")
        @Size(max = 50, message = "El color no puede superar 50 caracteres")
        String color,

        @Size(max = 500, message = "La URL de foto no puede superar 500 caracteres")
        String photoUrl
) {
}
