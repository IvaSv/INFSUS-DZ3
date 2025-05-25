package infsus.driving.hours.repository;

import infsus.driving.hours.entity.Field;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FieldRepository extends JpaRepository<Field, Long> {
    Field findByName(String name);
    List<Field> findByNameContainingIgnoreCase(String search);

}

