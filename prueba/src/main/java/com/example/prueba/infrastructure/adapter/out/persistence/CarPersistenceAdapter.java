package com.example.prueba.infrastructure.adapter.out.persistence;

import com.example.prueba.domain.model.Car;
import com.example.prueba.domain.port.in.CarQuery;
import com.example.prueba.domain.port.out.CarPersistencePort;
import com.example.prueba.infrastructure.adapter.out.persistence.entity.CarJpaEntity;
import com.example.prueba.infrastructure.adapter.out.persistence.entity.UserJpaEntity;
import com.example.prueba.infrastructure.adapter.out.persistence.mapper.CarPersistenceMapper;
import com.example.prueba.infrastructure.adapter.out.persistence.repository.CarJpaRepository;
import com.example.prueba.infrastructure.adapter.out.persistence.repository.UserJpaRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@Component
public class CarPersistenceAdapter implements CarPersistencePort {
    private final CarJpaRepository carJpaRepository;
    private final UserJpaRepository userJpaRepository;
    private final CarPersistenceMapper carPersistenceMapper;

    public CarPersistenceAdapter(
            CarJpaRepository carJpaRepository,
            UserJpaRepository userJpaRepository,
            CarPersistenceMapper carPersistenceMapper
    ) {
        this.carJpaRepository = carJpaRepository;
        this.userJpaRepository = userJpaRepository;
        this.carPersistenceMapper = carPersistenceMapper;
    }

    @Override
    public Car save(Car car) {
        UserJpaEntity user = userJpaRepository.getReferenceById(car.getUserId());
        return carPersistenceMapper.toDomain(carJpaRepository.save(carPersistenceMapper.toEntity(car, user)));
    }

    @Override
    public Optional<Car> findById(UUID id) {
        return carJpaRepository.findById(id).map(carPersistenceMapper::toDomain);
    }

    @Override
    public Optional<Car> findByIdAndUserId(UUID id, UUID userId) {
        return carJpaRepository.findByIdAndUser_Id(id, userId).map(carPersistenceMapper::toDomain);
    }

    @Override
    public List<Car> findByUserId(UUID userId) {
        return carJpaRepository.findByUser_IdOrderByCreatedAtDesc(userId)
                .stream()
                .map(carPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public List<Car> search(UUID userId, CarQuery query) {
        return carJpaRepository.findAll(searchSpecification(userId, query), Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(carPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public boolean existsByPlate(String plate) {
        return carJpaRepository.existsByPlateIgnoreCase(plate);
    }

    @Override
    public boolean existsByPlateExcludingId(String plate, UUID excludedId) {
        return carJpaRepository.existsByPlateIgnoreCaseAndIdNot(plate, excludedId);
    }

    @Override
    public void delete(Car car) {
        carJpaRepository.deleteById(car.getId());
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private Specification<CarJpaEntity> searchSpecification(
            UUID userId,
            CarQuery query
    ) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> matches = new ArrayList<>();
            addLike(matches, criteriaBuilder, root.get("plate"), query.plate());
            addLike(matches, criteriaBuilder, root.get("model"), query.model());
            addLike(matches, criteriaBuilder, root.get("brand"), query.brand());
            addLike(matches, criteriaBuilder, root.get("color"), query.color());

            if (query.year() != null) {
                matches.add(criteriaBuilder.equal(root.get("year"), query.year()));
            }

            Predicate belongsToUser = criteriaBuilder.equal(root.get("user").get("id"), userId);
            if (matches.isEmpty()) {
                return belongsToUser;
            }
            return criteriaBuilder.and(belongsToUser, criteriaBuilder.or(matches.toArray(Predicate[]::new)));
        };
    }

    private void addLike(
            List<Predicate> predicates,
            CriteriaBuilder criteriaBuilder,
            Path<String> path,
            String value
    ) {
        String normalizedValue = blankToNull(value);
        if (normalizedValue != null) {
            predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(path),
                    "%" + normalizedValue.toLowerCase(Locale.ROOT) + "%"
            ));
        }
    }
}
