package com.example.prueba.application.service;

import com.example.prueba.application.exception.ConflictException;
import com.example.prueba.application.exception.InvalidCredentialsException;
import com.example.prueba.domain.model.User;
import com.example.prueba.domain.port.in.AuthenticationResult;
import com.example.prueba.domain.port.in.AuthenticationUseCase;
import com.example.prueba.domain.port.in.LoginCommand;
import com.example.prueba.domain.port.in.RegisterUserCommand;
import com.example.prueba.domain.port.out.PasswordHasherPort;
import com.example.prueba.domain.port.out.TokenProviderPort;
import com.example.prueba.domain.port.out.UserPersistencePort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
@Transactional
public class AuthenticationService implements AuthenticationUseCase {
    private final UserPersistencePort userPersistencePort;
    private final PasswordHasherPort passwordHasherPort;
    private final TokenProviderPort tokenProviderPort;

    public AuthenticationService(
            UserPersistencePort userPersistencePort,
            PasswordHasherPort passwordHasherPort,
            TokenProviderPort tokenProviderPort
    ) {
        this.userPersistencePort = userPersistencePort;
        this.passwordHasherPort = passwordHasherPort;
        this.tokenProviderPort = tokenProviderPort;
    }

    @Override
    public AuthenticationResult register(RegisterUserCommand command) {
        String normalizedEmail = normalizeEmail(command.email());
        if (userPersistencePort.existsByEmail(normalizedEmail)) {
            throw new ConflictException("Ya existe un usuario registrado con ese email");
        }

        User user = User.create(command.name(), normalizedEmail, passwordHasherPort.hash(command.password()));
        User savedUser = userPersistencePort.save(user);

        return new AuthenticationResult(tokenProviderPort.generateToken(savedUser), savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public AuthenticationResult login(LoginCommand command) {
        User user = userPersistencePort.findByEmail(normalizeEmail(command.email()))
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordHasherPort.matches(command.password(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        return new AuthenticationResult(tokenProviderPort.generateToken(user), user);
    }

    private String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase(Locale.ROOT);
    }
}
