package infsus.user.note.controller.dto;

public class NoteForm {

    private String content;

    public NoteForm() {
    }

    public NoteForm(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }


}
