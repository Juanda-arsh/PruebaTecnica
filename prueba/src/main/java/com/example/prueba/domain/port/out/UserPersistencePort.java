package com.example.prueba.domain.port.out;

import com.example.prueba.domain.model.User;

import java.util.Optional;
import java.util.UUID;

public interface UserPersistencePort {
    User save(User user);

    Optional<User> findById(UUID id);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
