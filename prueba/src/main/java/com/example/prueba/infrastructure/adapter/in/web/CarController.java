package com.example.prueba.infrastructure.adapter.in.web;

import com.example.prueba.application.dto.CarRequest;
import com.example.prueba.application.dto.CarResponse;
import com.example.prueba.application.mapper.CarDtoMapper;
import com.example.prueba.domain.port.in.CarManagementUseCase;
import com.example.prueba.domain.port.in.CarQuery;
import com.example.prueba.domain.port.in.CreateCarCommand;
import com.example.prueba.domain.port.in.UpdateCarCommand;
import com.example.prueba.infrastructure.security.AuthenticatedUser;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cars")
public class CarController {
    private final CarManagementUseCase carManagementUseCase;
    private final CarDtoMapper carDtoMapper;

    public CarController(CarManagementUseCase carManagementUseCase, CarDtoMapper carDtoMapper) {
        this.carManagementUseCase = carManagementUseCase;
        this.carDtoMapper = carDtoMapper;
    }

    @GetMapping
    public ResponseEntity<List<CarResponse>> list(
            Authentication authentication,
            @RequestParam(required = false) String plate,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) Integer year
    ) {
        UUID userId = currentUser(authentication).id();
        List<CarResponse> response = carDtoMapper.toResponseList(
                carManagementUseCase.search(userId, new CarQuery(plate, model, brand, color, year))
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<CarResponse>> search(
            Authentication authentication,
            @RequestParam(required = false) String plate,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) Integer year
    ) {
        UUID userId = currentUser(authentication).id();
        return ResponseEntity.ok(carDtoMapper.toResponseList(
                carManagementUseCase.search(userId, new CarQuery(plate, model, brand, color, year))
        ));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<CarResponse>> filter(
            Authentication authentication,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) Integer year
    ) {
        UUID userId = currentUser(authentication).id();
        return ResponseEntity.ok(carDtoMapper.toResponseList(
                carManagementUseCase.search(userId, new CarQuery(null, null, brand, color, year))
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarResponse> get(Authentication authentication, @PathVariable UUID id) {
        return ResponseEntity.ok(carDtoMapper.toResponse(
                carManagementUseCase.getById(currentUser(authentication).id(), id)
        ));
    }

    @PostMapping
    public ResponseEntity<CarResponse> create(
            Authentication authentication,
            @Valid @RequestBody CarRequest request
    ) {
        CarResponse response = carDtoMapper.toResponse(carManagementUseCase.create(new CreateCarCommand(
                currentUser(authentication).id(),
                request.brand(),
                request.model(),
                request.year(),
                request.plate(),
                request.color(),
                request.photoUrl()
        )));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarResponse> update(
            Authentication authentication,
            @PathVariable UUID id,
            @Valid @RequestBody CarRequest request
    ) {
        CarResponse response = carDtoMapper.toResponse(carManagementUseCase.update(new UpdateCarCommand(
                currentUser(authentication).id(),
                id,
                request.brand(),
                request.model(),
                request.year(),
                request.plate(),
                request.color(),
                request.photoUrl()
        )));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication authentication, @PathVariable UUID id) {
        carManagementUseCase.delete(currentUser(authentication).id(), id);
        return ResponseEntity.noContent().build();
    }

    private AuthenticatedUser currentUser(Authentication authentication) {
        return (AuthenticatedUser) authentication.getPrincipal();
    }
}
