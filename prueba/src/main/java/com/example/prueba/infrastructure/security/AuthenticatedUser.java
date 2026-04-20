package com.example.prueba.infrastructure.security;

import com.example.prueba.domain.model.Role;

import java.util.UUID;

public record AuthenticatedUser(UUID id, String email, Role role) {
}
