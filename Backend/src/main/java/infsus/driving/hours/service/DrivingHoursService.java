package infsus.driving.hours.service;

import infsus.driving.hours.entity.Field;
import infsus.driving.hours.repository.FieldRepository;
import infsus.users.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import infsus.driving.hours.controller.dto.DrivingHoursDTO;
import infsus.driving.hours.controller.dto.DrivingHoursForm;
import infsus.driving.hours.entity.DrivingHours;
import infsus.driving.hours.repository.DrivingHoursRepository;
import infsus.users.entity.User;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DrivingHoursService {

    @Autowired
    private DrivingHoursRepository drivingHoursRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FieldRepository fieldRepository;


    public boolean add(DrivingHoursForm drivingHoursForm) {

        User user = userRepository.findUserByEmail(drivingHoursForm.getEmail());
        Field field = fieldRepository.findById(Long.parseLong(drivingHoursForm.getField()))
                .orElse(null);

        //validacija podataka koja se ne svodi na provjeru je li podatak popunjen, u valjanom rasponu
        // provjerava se neko složenije pravilo -> provjeriti max broj sati iz nekog podrucja

        //nije dozvoljen unos sati za buduće datume.
        if (drivingHoursForm.getDate().isAfter(LocalDate.now())) {
            return  false;
        }

        //samo kandidati mogu imati vožnje
        if (!user.getRole().getName().equals("kandidat")) {
            return  false;
        }


        DrivingHours drivingHours = new DrivingHours();
        drivingHours.setField(field);
        drivingHours.setDate(drivingHoursForm.getDate());
        drivingHours.setNote(drivingHoursForm.getNote());
        drivingHours.setStatus(drivingHoursForm.getStatus());
        drivingHours.setUser_id(user.getId());

        drivingHoursRepository.save(drivingHours);
        return true;
    }


    //student sees his notes
    public List<DrivingHoursDTO> getMyHourNotes(String studentEmail){

        User student = userRepository.findUserByEmail(studentEmail);
        Long userId = student.getId();

        List<DrivingHours> drivingHoursNotes = drivingHoursRepository.findAllByUserId(userId);
        List<DrivingHoursDTO> drivingHoursDTOList = new ArrayList<>();
        for(DrivingHours d : drivingHoursNotes){
            drivingHoursDTOList.add(new DrivingHoursDTO(d.getField().getName(), d.getDate(), d.getStatus(), d.getNote()));
        }

        return drivingHoursDTOList;
    }

    public List<DrivingHoursDTO> getHourNotes(String instructorEmail, String studentEmail){

        //instructorEmail za provjeru uloge korisnika koji pristupa ovoj putanji?

        User student = userRepository.findUserByEmail(studentEmail);
        Long userId = student.getId();

        List<DrivingHours> drivingHoursNotes = drivingHoursRepository.findAllByUserId(userId);
        List<DrivingHoursDTO> drivingHoursDTOList = new ArrayList<>();
        for(DrivingHours d : drivingHoursNotes){
            drivingHoursDTOList.add(new DrivingHoursDTO(d.getField().getName(), d.getDate(), d.getStatus(), d.getNote()));
        }

        return drivingHoursDTOList;
    }

}
