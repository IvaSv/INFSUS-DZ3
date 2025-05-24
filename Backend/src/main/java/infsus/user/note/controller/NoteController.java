package infsus.user.note.controller;

import infsus.security.configuration.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import infsus.user.note.controller.dto.AddNoteForm;
import infsus.user.note.controller.dto.NoteForm;
import infsus.user.note.service.NoteService;

@RestController
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @Autowired
    private JWTGenerator jwtGenerator;

    @PostMapping("/add")
    public ResponseEntity<Void> add(@RequestHeader("Authorization") String token,
                                    @RequestBody AddNoteForm addNoteForm) {

        System.out.println("In controller");
        boolean done = noteService.add(addNoteForm.getNote(), addNoteForm.getUserId());

        if(done) {
            System.out.println("Note added!");
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            throw new UsernameNotFoundException("Pogreska!");
        }
    }

    @GetMapping("/get")
    public ResponseEntity<NoteForm> getNote(@RequestHeader("Authorization") String token){
        NoteForm noteForm = noteService.getNote(jwtGenerator.getUsernameFromJWT(token));
        return ResponseEntity.ok(noteForm);
    }


    @PostMapping("/post")
    public ResponseEntity<Void> postNote(@RequestHeader("Authorization") String token, @RequestBody NoteForm noteForm) {
        boolean done = noteService.changeNote(jwtGenerator.getUsernameFromJWT(token), noteForm.getContent());

        if(done) {
            System.out.println("Note posted!");
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            throw new UsernameNotFoundException("Pogreska!");
        }
    }
}
