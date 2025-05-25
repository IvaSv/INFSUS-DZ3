package infsus.driving.hours.service;

import infsus.driving.hours.controller.dto.FieldDTO;
import infsus.driving.hours.entity.Field;
import infsus.driving.hours.repository.FieldRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FieldServiceT {

    @Mock
    private FieldRepository fieldRepository;

    @InjectMocks
    private FieldService fieldService;

    private Field field1, field2;

    /**
     * Priprema dva Field entiteta koja će se koristiti u testovima
     */
    @BeforeEach
    void setup() {
        field1 = new Field();

        field1.setId(1L);
        field1.setName("FieldOne");
        field1.setDescription("Description1");

        field2 = new Field();
        field2.setId(2L);
        field2.setName("FieldTwo");
        field2.setDescription("Description2");
    }

    /**
     * Testira dohvat svih Field objekata bez filtera.
     * Simulira poziv na repozitorij koji vraća listu svih Fieldova.
     * Provjerava se veličina liste i da je metoda repozitorija pozvana točno jednom.
     */
    @Test
    void testGetAllWithoutSearch() {
        when(fieldRepository.findAll()).thenReturn(List.of(field1, field2));

        List<FieldDTO> result = fieldService.getAll(null);

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getName()).isEqualTo("FieldOne");
        verify(fieldRepository, times(1)).findAll();
    }

    /**
     * Testira dohvat Field objekata s filterom po nazivu (search string).
     * Simulira poziv repozitorija koji vraća samo one koji sadrže traženi string.
     * Provjerava da vraćeni rezultat sadrži samo odgovarajući objekt.
     */
    @Test
    void testGetAllWithSearch() {
        when(fieldRepository.findByNameContainingIgnoreCase("One")).thenReturn(List.of(field1));

        List<FieldDTO> result = fieldService.getAll("One");

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getName()).isEqualTo("FieldOne");
        verify(fieldRepository, times(1)).findByNameContainingIgnoreCase("One");
    }

    /**
     * Testira dohvat Field objekta po ID-u kada entitet postoji.
     * Simulira pronalazak entiteta u repozitoriju i provjerava vraćeni DTO.
     */
    @Test
    void testGetByIdFound() {
        when(fieldRepository.findById(1L)).thenReturn(Optional.of(field1));

        FieldDTO dto = fieldService.getById(1L);

        assertThat(dto.getName()).isEqualTo("FieldOne");
    }

    /**
     * Testira dohvat Field objekta po ID-u kada entitet ne postoji.
     * Očekuje se iznimka RuntimeException s porukom da entitet nije pronađen.
     */
    @Test
    void testGetByIdNotFound() {
        when(fieldRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> fieldService.getById(1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Field not found");
    }

    /**
     * Testira uspješno kreiranje novog Field entiteta.
     * Provjerava se da se entitet sprema i da mu se dodjeljuje ID.
     */
    @Test
    void testCreateValid() {
        FieldDTO dto = new FieldDTO(null, "NewField", "NewDesc");
        when(fieldRepository.findByName("NewField")).thenReturn(null);

        // Simuliramo da save postavlja ID
        doAnswer(invocation -> {
            Field saved = invocation.getArgument(0);
            saved.setId(3L);
            return saved;
        }).when(fieldRepository).save(any(Field.class));

        FieldDTO created = fieldService.create(dto);

        assertThat(created.getId()).isEqualTo(3L);
        assertThat(created.getName()).isEqualTo("NewField");
        verify(fieldRepository, times(1)).save(any(Field.class));
    }

    /**
     * Testira da kreiranje Field entiteta s imenom koje sadrži brojeve
     * baca IllegalArgumentException s odgovarajućom porukom.
     */
    @Test
    void testCreateNameContainsNumbers() {
        FieldDTO dto = new FieldDTO(null, "Name123", "Desc");

        assertThatThrownBy(() -> fieldService.create(dto))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("ne smije sadržavati brojeve");
    }

    /**
     * Testira da kreiranje Field entiteta s duplim imenom baca IllegalArgumentException.
     * Simulira pronalazak entiteta s istim imenom u repozitoriju.
     */
    @Test
    void testCreateNameDuplicate() {
        FieldDTO dto = new FieldDTO(null, "FieldOne", "Desc");
        when(fieldRepository.findByName("FieldOne")).thenReturn(field1);

        assertThatThrownBy(() -> fieldService.create(dto))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("već postoji");
    }

    /**
     * Testira uspješno ažuriranje postojeće Field entiteta.
     * Provjerava da je repozitorij pozvan za spremanje ažuriranog entiteta.
     */
    @Test
    void testUpdateValid() {
        FieldDTO dto = new FieldDTO(null, "UpdatedName", "Desc");
        when(fieldRepository.findById(1L)).thenReturn(Optional.of(field1));

        FieldDTO updated = fieldService.update(1L, dto);

        assertThat(updated.getName()).isEqualTo("UpdatedName");
        verify(fieldRepository).save(field1);
    }

    /**
     * Testira ažuriranje Field entiteta koji ne postoji.
     * Očekuje se RuntimeException s porukom da entitet nije pronađen.
     */
    @Test
    void testUpdateNotFound() {
        when(fieldRepository.findById(1L)).thenReturn(Optional.empty());

        FieldDTO dto = new FieldDTO(null, "Name", "Desc");
        assertThatThrownBy(() -> fieldService.update(1L, dto))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Field not found");
    }

    /**
     * Testira da ažuriranje Field entiteta s imenom koje sadrži brojeve
     * baca IllegalArgumentException.
     */
    @Test
    void testUpdateNameContainsNumbers() {
        when(fieldRepository.findById(1L)).thenReturn(Optional.of(field1));
        FieldDTO dto = new FieldDTO(null, "Name123", "Desc");

        assertThatThrownBy(() -> fieldService.update(1L, dto))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("ne smije sadržavati brojeve");
    }

    /**
     * Testira brisanje postojeće Field entiteta.
     * Provjerava da repozitorij poziva deleteById.
     */
    @Test
    void testDeleteExists() {
        when(fieldRepository.existsById(1L)).thenReturn(true);

        fieldService.delete(1L);

        verify(fieldRepository).deleteById(1L);
    }

    /**
     * Testira brisanje Field entiteta koji ne postoji.
     * Očekuje se RuntimeException s porukom da entitet nije pronađen.
     */
    @Test
    void testDeleteNotExists() {
        when(fieldRepository.existsById(1L)).thenReturn(false);

        assertThatThrownBy(() -> fieldService.delete(1L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Field not found");
    }
}

