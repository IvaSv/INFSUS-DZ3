package infsus.driving.hours.controller;

import infsus.driving.hours.controller.dto.FieldDTO;
import infsus.driving.hours.entity.Field;
import infsus.driving.hours.service.FieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fields")
@CrossOrigin(origins = "*")
public class FieldController {

    @Autowired
    private FieldService fieldService;

    @GetMapping("/getAll")
    public List<FieldDTO> getAll(@RequestParam(required = false) String search) {
        return fieldService.getAll(search);
    }

    @GetMapping("/getById/{id}")
    public FieldDTO getById(@PathVariable Long id) {
        return fieldService.getById(id);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody FieldDTO fieldDTO) {
        try {
            return ResponseEntity.ok(fieldService.create(fieldDTO));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody FieldDTO fieldDTO) {
        try {
            return ResponseEntity.ok(fieldService.update(id, fieldDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            fieldService.delete(id);
            return ResponseEntity.ok("Uspješno obrisano");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
