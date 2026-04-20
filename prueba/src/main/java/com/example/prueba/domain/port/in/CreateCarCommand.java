package com.example.prueba.domain.port.in;

import java.util.UUID;

public record CreateCarCommand(
        UUID userId,
        String brand,
        String model,
        Integer year,
        String plate,
        String color,
        String photoUrl
) {
}
