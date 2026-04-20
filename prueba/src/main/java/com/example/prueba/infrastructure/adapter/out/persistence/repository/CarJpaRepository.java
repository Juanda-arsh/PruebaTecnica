package com.example.prueba.infrastructure.adapter.out.persistence.repository;

import com.example.prueba.infrastructure.adapter.out.persistence.entity.CarJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CarJpaRepository extends JpaRepository<CarJpaEntity, UUID>, JpaSpecificationExecutor<CarJpaEntity> {
    Optional<CarJpaEntity> findByIdAndUser_Id(UUID id, UUID userId);

    List<CarJpaEntity> findByUser_IdOrderByCreatedAtDesc(UUID userId);

    boolean existsByPlateIgnoreCase(String plate);

    boolean existsByPlateIgnoreCaseAndIdNot(String plate, UUID id);
}
