package infsus.driving.hours.service;

import infsus.driving.hours.controller.dto.FieldDTO;
import infsus.driving.hours.entity.Field;
import infsus.driving.hours.repository.FieldRepository;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FieldService {

    @Autowired
    private FieldRepository fieldRepository;

    public List<FieldDTO> getAll(String search) {
        List<Field> fields = (search != null && !search.isEmpty())
                ? fieldRepository.findByNameContainingIgnoreCase(search)
                : fieldRepository.findAll();
        return fields.stream().map(f -> new FieldDTO(f.getId(), f.getName(), f.getDescription())).toList();
    }

    public FieldDTO getById(Long id) {
        Field field = fieldRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Field not found"));
        return new FieldDTO(field.getId(), field.getName(), field.getDescription());
    }

    public FieldDTO create(FieldDTO dto) {
        // Složenija validacija: naziv ne smije biti duplikat ni sadržavati brojeve
        if (dto.getName().matches(".*\\d.*")) {
            throw new IllegalArgumentException("Naziv ne smije sadržavati brojeve.");
        }

        Field existingField = fieldRepository.findByName(dto.getName());
        if (existingField != null) {
            throw new IllegalArgumentException("Naziv već postoji.");
        }

        Field field = new Field();
        field.setName(dto.getName());
        field.setDescription(dto.getDescription());
        fieldRepository.save(field);
        return new FieldDTO(field.getId(), field.getName(), field.getDescription());
    }

    public FieldDTO update(Long id, FieldDTO dto) {
        Field field = fieldRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Field not found"));

        if (dto.getName().matches(".*\\d.*")) {
            throw new IllegalArgumentException("Naziv ne smije sadržavati brojeve.");
        }

        field.setName(dto.getName());
        fieldRepository.save(field);
        return new FieldDTO(field.getId(), field.getName(), field.getDescription());
    }

    public void delete(Long id) {
        if (!fieldRepository.existsById(id)) {
            throw new RuntimeException("Field not found");
        }
        fieldRepository.deleteById(id);
    }
}
