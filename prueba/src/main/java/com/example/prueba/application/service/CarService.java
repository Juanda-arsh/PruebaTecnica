package com.example.prueba.application.service;

import com.example.prueba.application.exception.BadRequestException;
import com.example.prueba.application.exception.ConflictException;
import com.example.prueba.application.exception.ResourceNotFoundException;
import com.example.prueba.domain.model.Car;
import com.example.prueba.domain.port.in.CarManagementUseCase;
import com.example.prueba.domain.port.in.CarQuery;
import com.example.prueba.domain.port.in.CreateCarCommand;
import com.example.prueba.domain.port.in.UpdateCarCommand;
import com.example.prueba.domain.port.out.CarPersistencePort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class CarService implements CarManagementUseCase {
    private final CarPersistencePort carPersistencePort;

    public CarService(CarPersistencePort carPersistencePort) {
        this.carPersistencePort = carPersistencePort;
    }

    @Override
    public Car create(CreateCarCommand command) {
        validateYear(command.year());
        Car car = Car.create(
                command.brand(),
                command.model(),
                command.year(),
                command.plate(),
                command.color(),
                command.photoUrl(),
                command.userId()
        );

        if (carPersistencePort.existsByPlate(car.getPlate())) {
            throw new ConflictException("Ya existe un auto registrado con esa placa");
        }

        return carPersistencePort.save(car);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Car> listByUser(UUID userId) {
        return carPersistencePort.findByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Car> search(UUID userId, CarQuery query) {
        return query == null || !query.hasFilters()
                ? carPersistencePort.findByUserId(userId)
                : carPersistencePort.search(userId, query);
    }

    @Override
    @Transactional(readOnly = true)
    public Car getById(UUID userId, UUID carId) {
        return findOwnedCar(userId, carId);
    }

    @Override
    public Car update(UpdateCarCommand command) {
        validateYear(command.year());
        Car car = findOwnedCar(command.userId(), command.carId());
        car.updateDetails(
                command.brand(),
                command.model(),
                command.year(),
                command.plate(),
                command.color(),
                command.photoUrl()
        );

        if (carPersistencePort.existsByPlateExcludingId(car.getPlate(), car.getId())) {
            throw new ConflictException("Ya existe otro auto registrado con esa placa");
        }

        return carPersistencePort.save(car);
    }

    @Override
    public void delete(UUID userId, UUID carId) {
        Car car = findOwnedCar(userId, carId);
        carPersistencePort.delete(car);
    }

    private Car findOwnedCar(UUID userId, UUID carId) {
        return carPersistencePort.findByIdAndUserId(carId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Auto no encontrado"));
    }

    private void validateYear(Integer year) {
        int maxYear = Year.now().getValue() + 1;
        if (year == null || year < 1886 || year > maxYear) {
            throw new BadRequestException("El anio del auto debe estar entre 1886 y " + maxYear);
        }
    }
}
