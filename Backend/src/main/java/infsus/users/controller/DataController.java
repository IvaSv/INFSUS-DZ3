package infsus.users.controller;

import infsus.users.controller.dto.UsersForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import infsus.security.configuration.JWTGenerator;
import infsus.users.controller.dto.DataForm;
import infsus.users.controller.dto.UserRegisterForm;
import infsus.users.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/data")
public class DataController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTGenerator jwtGenerator;

    @GetMapping()
    public ResponseEntity<DataForm> data(@RequestHeader("Authorization") String token){
        System.out.println("I am in data!");
        DataForm dataForm = userService.data(jwtGenerator.getUsernameFromJWT(token));
        return ResponseEntity.ok(dataForm);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UsersForm>> getAllUsersBasedOnRole(@RequestHeader("Authorization") String token, @RequestHeader("Role") String role) {
        List<UsersForm> users = userService.getUsersData(jwtGenerator.getUsernameFromJWT(token), role);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/register")
    public ResponseEntity<Long> register(@RequestHeader("Authorization") String token, @RequestBody UserRegisterForm userRegisterForm) {

        Long userId = userService.register(userRegisterForm);
        return ResponseEntity.ok(userId);

    }











}
