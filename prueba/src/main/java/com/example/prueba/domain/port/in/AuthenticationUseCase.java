package com.example.prueba.domain.port.in;

public interface AuthenticationUseCase {
    AuthenticationResult register(RegisterUserCommand command);

    AuthenticationResult login(LoginCommand command);
}
