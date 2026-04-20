package com.example.prueba.domain.port.out;

import com.example.prueba.domain.model.TokenClaims;
import com.example.prueba.domain.model.User;

import java.util.Optional;

public interface TokenProviderPort {
    String generateToken(User user);

    Optional<TokenClaims> validateToken(String token);
}
