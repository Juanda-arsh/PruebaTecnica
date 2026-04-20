package com.example.prueba.application.dto;

public record AuthResponse(String token, String tokenType, UserResponse user) {
}
