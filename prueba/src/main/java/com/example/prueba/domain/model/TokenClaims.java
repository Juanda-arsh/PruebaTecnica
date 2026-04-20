package com.example.prueba.domain.model;

import java.util.UUID;

public record TokenClaims(UUID userId, String email, Role role) {
}
