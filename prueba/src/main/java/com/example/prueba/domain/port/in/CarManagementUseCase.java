package com.example.prueba.domain.port.in;

import com.example.prueba.domain.model.Car;

import java.util.List;
import java.util.UUID;

public interface CarManagementUseCase {
    Car create(CreateCarCommand command);

    List<Car> listByUser(UUID userId);

    List<Car> search(UUID userId, CarQuery query);

    Car getById(UUID userId, UUID carId);

    Car update(UpdateCarCommand command);

    void delete(UUID userId, UUID carId);
}
