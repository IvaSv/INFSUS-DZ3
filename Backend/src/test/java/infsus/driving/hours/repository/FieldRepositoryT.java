package infsus.driving.hours.repository;

import infsus.driving.hours.entity.Field;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@DataJpaTest
@ExtendWith(SpringExtension.class)
public class FieldRepositoryT {


    @Autowired
    private FieldRepository fieldRepository;

    /**
     * Testira metodu `findByName` u FieldRepository-ju.
     *
     * Kreira se novi Field entitet s nazivom "D" i opisom "Dodatno vježbanje",
     * sprema se u bazu i zatim se dohvaća putem metode `findByName`.
     *
     * Očekuje se da vraćeni objekt nije null i da ima naziv "D".
     */
    @Test
    void testFindByName() {

        String name = "D";
        String description = "Dodatno vježbanje";
        Field field = new Field(name, description);

        fieldRepository.save(field);

        Field found = fieldRepository.findByName("D");

        assertNotNull(found);
        assertEquals("D", found.getName());
    }


}
