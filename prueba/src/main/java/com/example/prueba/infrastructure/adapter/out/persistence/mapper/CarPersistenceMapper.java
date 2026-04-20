package com.example.prueba.infrastructure.adapter.out.persistence.mapper;

import com.example.prueba.domain.model.Car;
import com.example.prueba.infrastructure.adapter.out.persistence.entity.CarJpaEntity;
import com.example.prueba.infrastructure.adapter.out.persistence.entity.UserJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class CarPersistenceMapper {
    public Car toDomain(CarJpaEntity entity) {
        return Car.rehydrate(
                entity.getId(),
                entity.getBrand(),
                entity.getModel(),
                entity.getYear(),
                entity.getPlate(),
                entity.getColor(),
                entity.getPhotoUrl(),
                entity.getUser().getId(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    public CarJpaEntity toEntity(Car car, UserJpaEntity user) {
        CarJpaEntity entity = new CarJpaEntity();
        entity.setId(car.getId());
        entity.setBrand(car.getBrand());
        entity.setModel(car.getModel());
        entity.setYear(car.getYear());
        entity.setPlate(car.getPlate());
        entity.setColor(car.getColor());
        entity.setPhotoUrl(car.getPhotoUrl());
        entity.setUser(user);
        entity.setCreatedAt(car.getCreatedAt());
        entity.setUpdatedAt(car.getUpdatedAt());
        return entity;
    }
}
