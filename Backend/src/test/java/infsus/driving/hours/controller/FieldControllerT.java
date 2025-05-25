package infsus.driving.hours.controller;

import infsus.driving.hours.controller.dto.FieldDTO;
import infsus.driving.hours.service.FieldService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FieldControllerT {

    @Mock
    private FieldService fieldService;

    @InjectMocks
    private FieldController fieldController;

    private FieldDTO sampleField;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        sampleField = new FieldDTO(1L, "D", "Dodatno vježbanje");
    }

    /**
     * Testira dohvat svih Field zapisa bez parametra pretrage.
     * Očekuje listu s jednim elementom čiji je naziv "D".
     */
    @Test
    public void testGetAllFields() {
        List<FieldDTO> fields = Arrays.asList(sampleField);
        when(fieldService.getAll(null)).thenReturn(fields);

        List<FieldDTO> result = fieldController.getAll(null);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("D", result.get(0).getName());
    }

    /**
     * Testira dohvat jednog Field zapisa po ID-u.
     * Očekuje da vraćeni Field ima naziv "D".
     */
    @Test
    public void testGetFieldById() {
        when(fieldService.getById(1L)).thenReturn(sampleField);

        FieldDTO result = fieldController.getById(1L);

        assertNotNull(result);
        assertEquals("D", result.getName());
    }

    /**
     * Testira uspješno kreiranje Field entiteta.
     * Očekuje HTTP status 200 i da vraćeni objekt ima naziv "D".
     */
    @Test
    public void testCreateFieldSuccess() {
        when(fieldService.create(any(FieldDTO.class))).thenReturn(sampleField);

        ResponseEntity<?> response = fieldController.create(sampleField);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof FieldDTO);
        assertEquals("D", ((FieldDTO) response.getBody()).getName());
    }

    /**
     * Testira neuspješno kreiranje Field entiteta kada već postoji entitet s istim nazivom.
     * Očekuje HTTP status 400 i poruku o grešci.
     */
    @Test
    public void testCreateFieldError() {
        when(fieldService.create(any(FieldDTO.class))).thenThrow(new IllegalArgumentException("Postoji već takav naziv"));

        ResponseEntity<?> response = fieldController.create(sampleField);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Postoji već takav naziv", response.getBody());
    }

    /**
     * Testira uspješno brisanje Field entiteta po ID-u.
     * Očekuje HTTP status 200 i poruku "Uspješno obrisano".
     */
    @Test
    public void testDeleteSuccess() {
        doNothing().when(fieldService).delete(1L);

        ResponseEntity<?> response = fieldController.delete(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Uspješno obrisano", response.getBody());
    }

    /**
     * Testira neuspješno brisanje Field entiteta kada ID ne postoji.
     * Očekuje HTTP status 404 i odgovarajuću poruku o grešci.
     */
    @Test
    public void testDeleteError() {
        doThrow(new RuntimeException("Ne postoji ID")).when(fieldService).delete(99L);

        ResponseEntity<?> response = fieldController.delete(99L);

        assertEquals(404, response.getStatusCodeValue());
        assertEquals("Ne postoji ID", response.getBody());
    }

    /**
     * Testira uspješno ažuriranje Field entiteta.
     * Očekuje HTTP status 200 i da vraćeni objekt ima novi naziv "E".
     */
    @Test
    public void testUpdateSuccess() {
        FieldDTO updatedField = new FieldDTO(1L, "E", "Izmijenjeno");

        when(fieldService.update(eq(1L), any(FieldDTO.class))).thenReturn(updatedField);

        ResponseEntity<?> response = fieldController.update(1L, sampleField);

        assertEquals(200, response.getStatusCodeValue());
        FieldDTO body = (FieldDTO) response.getBody();
        assertEquals("E", body.getName());
    }

    /**
     * Testira neuspješno ažuriranje Field entiteta kada dođe do greške u servisu.
     * Očekuje HTTP status 400 i odgovarajuću poruku o grešci.
     */
    @Test
    public void testUpdateError() {
        when(fieldService.update(eq(1L), any(FieldDTO.class)))
                .thenThrow(new RuntimeException("Greška pri ažuriranju"));

        ResponseEntity<?> response = fieldController.update(1L, sampleField);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Greška pri ažuriranju", response.getBody());
    }
}
