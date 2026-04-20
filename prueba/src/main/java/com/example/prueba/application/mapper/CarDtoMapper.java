package com.example.prueba.application.mapper;

import com.example.prueba.application.dto.CarResponse;
import com.example.prueba.domain.model.Car;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CarDtoMapper {
    public CarResponse toResponse(Car car) {
        return new CarResponse(
                car.getId(),
                car.getBrand(),
                car.getModel(),
                car.getYear(),
                car.getPlate(),
                car.getColor(),
                car.getPhotoUrl(),
                car.getUserId(),
                car.getCreatedAt(),
                car.getUpdatedAt()
        );
    }

    public List<CarResponse> toResponseList(List<Car> cars) {
        return cars.stream().map(this::toResponse).toList();
    }
}
