package com.example.prueba;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class PruebaApplicationTests {
    @Test
    void applicationClassExists() {
        assertThat(new PruebaApplication()).isNotNull();
    }
}
