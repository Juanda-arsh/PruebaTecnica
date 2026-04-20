package com.example.prueba.domain.model;

import java.time.Instant;
import java.util.Locale;
import java.util.UUID;

public class Car {
    private final UUID id;
    private String brand;
    private String model;
    private Integer year;
    private String plate;
    private String color;
    private String photoUrl;
    private final UUID userId;
    private final Instant createdAt;
    private Instant updatedAt;

    private Car(
            UUID id,
            String brand,
            String model,
            Integer year,
            String plate,
            String color,
            String photoUrl,
            UUID userId,
            Instant createdAt,
            Instant updatedAt
    ) {
        this.id = id;
        this.brand = requireText(brand, "brand");
        this.model = requireText(model, "model");
        this.year = requireYear(year);
        this.plate = normalizePlate(plate);
        this.color = requireText(color, "color");
        this.photoUrl = normalizeOptional(photoUrl);
        this.userId = requireUserId(userId);
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static Car create(
            String brand,
            String model,
            Integer year,
            String plate,
            String color,
            String photoUrl,
            UUID userId
    ) {
        return new Car(null, brand, model, year, plate, color, photoUrl, userId, null, null);
    }

    public static Car rehydrate(
            UUID id,
            String brand,
            String model,
            Integer year,
            String plate,
            String color,
            String photoUrl,
            UUID userId,
            Instant createdAt,
            Instant updatedAt
    ) {
        return new Car(id, brand, model, year, plate, color, photoUrl, userId, createdAt, updatedAt);
    }

    public void updateDetails(String brand, String model, Integer year, String plate, String color, String photoUrl) {
        this.brand = requireText(brand, "brand");
        this.model = requireText(model, "model");
        this.year = requireYear(year);
        this.plate = normalizePlate(plate);
        this.color = requireText(color, "color");
        this.photoUrl = normalizeOptional(photoUrl);
        this.updatedAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public String getBrand() {
        return brand;
    }

    public String getModel() {
        return model;
    }

    public Integer getYear() {
        return year;
    }

    public String getPlate() {
        return plate;
    }

    public String getColor() {
        return color;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public UUID getUserId() {
        return userId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    private static UUID requireUserId(UUID value) {
        if (value == null) {
            throw new IllegalArgumentException("userId is required");
        }
        return value;
    }

    private static Integer requireYear(Integer value) {
        if (value == null) {
            throw new IllegalArgumentException("year is required");
        }
        return value;
    }

    private static String requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(field + " is required");
        }
        return value.trim();
    }

    private static String normalizePlate(String value) {
        return requireText(value, "plate").toUpperCase(Locale.ROOT);
    }

    private static String normalizeOptional(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
