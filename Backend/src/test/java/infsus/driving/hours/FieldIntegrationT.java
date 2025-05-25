package infsus.driving.hours;

import infsus.driving.hours.controller.dto.FieldDTO;
import infsus.driving.hours.repository.DrivingHoursRepository;
import infsus.driving.hours.repository.FieldRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class FieldIntegrationT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DrivingHoursRepository drivingHoursRepository;

    /**
     *  Prije svakog testa obriši sve podatke iz DrivingHours i Field repozitorija,
     *  kako bi testovi bili izolirani i podaci bili čisti
     */
    @BeforeEach
    public void setup() {
        drivingHoursRepository.deleteAll();
        fieldRepository.deleteAll();
    }


    /**
     * Testira kreiranje novog Field entiteta preko REST API-ja
     * te dohvaćanje istog entiteta preko GET zahtjeva.
     *
     * Koristi MockMvc za slanje HTTP POST zahtjeva na /fields endpoint s JSON tijelom.
     * Očekuje status 200 OK i provjerava vraćene podatke.
     *
     * Nakon kreiranja, dohvaća entitet iz baze i preko GET zahtjeva provjerava
     * da su podaci točni i da entitet postoji.
     */
    @Test
    public void testCreateAndGetField() throws Exception {
        FieldDTO newField = new FieldDTO(null, "TestField", "Opis test polja");

        // Kreiraj entitet preko REST API-ja (prezentacijski sloj)
        mockMvc.perform(post("/fields")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newField)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("TestField")))
                .andExpect(jsonPath("$.description", is("Opis test polja")));

        // Provjeri da li entitet postoji u bazi (pristup podacima sloj)
        Long id = fieldRepository.findByName("TestField").getId();

        // Dohvati polje preko REST API-ja (prezentacijski + poslovni sloj)
        mockMvc.perform(get("/fields/getById/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("TestField")))
                .andExpect(jsonPath("$.description", is("Opis test polja")));
    }

    /**
     * Testira ažuriranje postojećeg Field entiteta preko REST API-ja.
     *
     * Prvo se direktno u bazu sprema entitet sa starim podacima.
     * Nakon toga se šalje HTTP PUT zahtjev na /fields/{id} s novim podacima u JSON formatu.
     * Provjerava se status 200 OK i da li je polje ime uspješno promijenjeno.
     *
     * Na kraju se dodatno provjerava u bazi da je entitet zaista ažuriran.
     */
    @Test
    public void testUpdateField() throws Exception {
        // Spremi polje direktno u repozitorij (pristup podacima)
        var field = fieldRepository.save(new infsus.driving.hours.entity.Field( "OldName", "OldDescription"));

        FieldDTO updatedField = new FieldDTO(null, "NewName", "UpdatedDescription");

        // Ažuriraj polje preko REST API-ja (prezentacijski + poslovni sloj)
        mockMvc.perform(put("/fields/" + field.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedField)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("NewName")));

        // Provjeri u bazi
        var updatedEntity = fieldRepository.findById(field.getId()).orElseThrow();
        assert(updatedEntity.getName().equals("NewName"));
    }

    /**
     * Testira brisanje postojećeg Field entiteta preko REST API-ja.
     *
     * Entitet se prvo sprema direktno u bazu,
     * zatim se šalje HTTP DELETE zahtjev na /fields/{id}.
     * Provjerava se status 200 OK nakon brisanja.
     *
     * Na kraju se provjerava da entitet više ne postoji u bazi.
     */
    @Test
    public void testDeleteField() throws Exception {
        // Spremi polje direktno u repozitorij
        var field = fieldRepository.save(new infsus.driving.hours.entity.Field( "ToDelete", "Opis"));

        // Obriši polje preko REST API-ja
        mockMvc.perform(delete("/fields/" + field.getId()))
                .andExpect(status().isOk());

        // Provjeri da polje više ne postoji
        boolean exists = fieldRepository.existsById(field.getId());
        assert(!exists);
    }
}
