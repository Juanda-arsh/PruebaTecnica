package com.example.prueba.application.dto;

import com.example.prueba.domain.model.Role;

import java.time.Instant;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String name,
        String email,
        Role role,
        Instant createdAt,
        Instant updatedAt
) {
}
