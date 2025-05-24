package infsus.driving.hours.controller;

import infsus.driving.hours.controller.dto.DrivingHoursDTO;
import infsus.driving.hours.controller.dto.DrivingHoursForm;
import infsus.driving.hours.service.DrivingHoursService;
import infsus.security.configuration.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/driving_hours")
public class DrivingHoursController {

    @Autowired
    private DrivingHoursService drivingHoursService;

    @Autowired
    private JWTGenerator jwtGenerator;

    @PostMapping("/add")
    public ResponseEntity<Void> add(@RequestHeader("Authorization") String token, @RequestBody DrivingHoursForm drivingHoursForm){

        boolean saved = drivingHoursService.add(drivingHoursForm);

        if(saved) {
            System.out.println("Bilješka za sat je uspešno dodana!");
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            System.out.println("Bilješka za sat nije uspešno dodana!");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/get")
    public ResponseEntity<List<DrivingHoursDTO>> get(@RequestHeader("Authorization") String token, @RequestHeader("StudentEmail") String studentEmail){

        List<DrivingHoursDTO> drivingHoursDTOList = drivingHoursService.getHourNotes(jwtGenerator.getUsernameFromJWT(token), studentEmail );

        return ResponseEntity.ok(drivingHoursDTOList);
    }


    @GetMapping("/getMy")
    public ResponseEntity<List<DrivingHoursDTO>> getMy(@RequestHeader("Authorization") String token){

        List<DrivingHoursDTO> drivingHoursDTOList = drivingHoursService.getMyHourNotes(jwtGenerator.getUsernameFromJWT(token));

        return ResponseEntity.ok(drivingHoursDTOList);
    }



}
