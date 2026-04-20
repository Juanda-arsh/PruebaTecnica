package com.example.prueba.application.dto;

import java.time.Instant;
import java.util.UUID;

public record CarResponse(
        UUID id,
        String brand,
        String model,
        Integer year,
        String plate,
        String color,
        String photoUrl,
        UUID userId,
        Instant createdAt,
        Instant updatedAt
) {
}
