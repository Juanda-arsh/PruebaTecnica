package com.example.prueba.infrastructure.adapter.in.web;

import com.example.prueba.application.dto.AuthResponse;
import com.example.prueba.application.dto.LoginRequest;
import com.example.prueba.application.dto.RegisterRequest;
import com.example.prueba.application.mapper.UserDtoMapper;
import com.example.prueba.domain.port.in.AuthenticationUseCase;
import com.example.prueba.domain.port.in.LoginCommand;
import com.example.prueba.domain.port.in.RegisterUserCommand;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationUseCase authenticationUseCase;
    private final UserDtoMapper userDtoMapper;

    public AuthController(AuthenticationUseCase authenticationUseCase, UserDtoMapper userDtoMapper) {
        this.authenticationUseCase = authenticationUseCase;
        this.userDtoMapper = userDtoMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = userDtoMapper.toAuthResponse(authenticationUseCase.register(
                new RegisterUserCommand(request.name(), request.email(), request.password())
        ));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = userDtoMapper.toAuthResponse(authenticationUseCase.login(
                new LoginCommand(request.email(), request.password())
        ));
        return ResponseEntity.ok(response);
    }
}
