package com.example.prueba.domain.port.in;

import com.example.prueba.domain.model.User;

public record AuthenticationResult(String token, User user) {
}
