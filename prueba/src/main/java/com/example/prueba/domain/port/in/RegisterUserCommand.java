package com.example.prueba.domain.port.in;

public record RegisterUserCommand(String name, String email, String password) {
}
