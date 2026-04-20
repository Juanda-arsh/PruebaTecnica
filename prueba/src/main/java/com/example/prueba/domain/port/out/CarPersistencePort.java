package com.example.prueba.domain.port.out;

import com.example.prueba.domain.model.Car;
import com.example.prueba.domain.port.in.CarQuery;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CarPersistencePort {
    Car save(Car car);

    Optional<Car> findById(UUID id);

    Optional<Car> findByIdAndUserId(UUID id, UUID userId);

    List<Car> findByUserId(UUID userId);

    List<Car> search(UUID userId, CarQuery query);

    boolean existsByPlate(String plate);

    boolean existsByPlateExcludingId(String plate, UUID excludedId);

    void delete(Car car);
}
