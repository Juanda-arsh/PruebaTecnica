package com.example.prueba.domain.model;

import java.time.Instant;
import java.util.Locale;
import java.util.Objects;
import java.util.UUID;

public class User {
    private final UUID id;
    private final String name;
    private final String email;
    private final String password;
    private final Role role;
    private final Instant createdAt;
    private final Instant updatedAt;

    private User(
            UUID id,
            String name,
            String email,
            String password,
            Role role,
            Instant createdAt,
            Instant updatedAt
    ) {
        this.id = id;
        this.name = requireText(name, "name");
        this.email = normalizeEmail(email);
        this.password = requireText(password, "password");
        this.role = Objects.requireNonNullElse(role, Role.USER);
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static User create(String name, String email, String passwordHash) {
        return new User(null, name, email, passwordHash, Role.USER, null, null);
    }

    public static User rehydrate(
            UUID id,
            String name,
            String email,
            String password,
            Role role,
            Instant createdAt,
            Instant updatedAt
    ) {
        return new User(id, name, email, password, role, createdAt, updatedAt);
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    private static String normalizeEmail(String value) {
        return requireText(value, "email").toLowerCase(Locale.ROOT);
    }

    private static String requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(field + " is required");
        }
        return value.trim();
    }
}
