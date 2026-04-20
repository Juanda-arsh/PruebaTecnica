package com.example.prueba.application.mapper;

import com.example.prueba.application.dto.AuthResponse;
import com.example.prueba.application.dto.UserResponse;
import com.example.prueba.domain.model.User;
import com.example.prueba.domain.port.in.AuthenticationResult;
import org.springframework.stereotype.Component;

@Component
public class UserDtoMapper {
    public AuthResponse toAuthResponse(AuthenticationResult result) {
        return new AuthResponse(result.token(), "Bearer", toResponse(result.user()));
    }

    public UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}
