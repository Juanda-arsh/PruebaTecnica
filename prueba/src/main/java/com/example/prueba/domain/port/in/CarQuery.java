package com.example.prueba.domain.port.in;

public record CarQuery(String plate, String model, String brand, String color, Integer year) {
    public boolean hasFilters() {
        return hasText(plate) || hasText(model) || hasText(brand) || hasText(color) || year != null;
    }

    private static boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}
