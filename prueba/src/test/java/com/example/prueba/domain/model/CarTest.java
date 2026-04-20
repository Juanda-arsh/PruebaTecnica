package com.example.prueba.domain.model;

import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class CarTest {
    @Test
    void createNormalizesPlate() {
        Car car = Car.create("Toyota", "Corolla", 2020, " abc123 ", "Rojo", null, UUID.randomUUID());

        assertThat(car.getPlate()).isEqualTo("ABC123");
    }
}
