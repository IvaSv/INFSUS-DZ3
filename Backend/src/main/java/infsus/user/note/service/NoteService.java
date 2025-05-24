package infsus.user.note.service;

import infsus.users.entity.User;
import infsus.users.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import infsus.user.note.controller.dto.NoteForm;
import infsus.user.note.entity.Note;
import infsus.user.note.repository.NoteRepository;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    public NoteForm getNote(String username){

        String email = username;
        User user = userRepository.findUserByEmail(email);
        Long userId = user.getId();

        if(user != null ){
            Note note = noteRepository.findByUserId(userId);
            return new NoteForm(note.getContent());
        } else {
            throw new UsernameNotFoundException("Korisnik ne postoji!");
        }

    }

    public boolean add(String noteContent, Long userId) {

        //provjera?
        User user = userRepository.findByUserId(userId);
        Long id = user.getId();

        if(user != null ){

            Note note = new Note();
            note.setContent(noteContent);
            note.setUserId(userId);
            noteRepository.save(note);
            System.out.println("Returing true" );
            return true;
        } else {
            System.out.println("Returing false" );
            return false;
        }
    }

    @Transactional
    public boolean changeNote(String username, String content) {
        String email = username;
        User user = userRepository.findUserByEmail(email);
        Long userId = user.getId();

        if(user != null ){
            Note note = noteRepository.findByUserId(userId);
            note.setContent(content);
            noteRepository.save(note);

            return true;
        } else {
            return false;
        }

    }
}
