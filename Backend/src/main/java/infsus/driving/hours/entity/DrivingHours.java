package infsus.driving.hours.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class DrivingHours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="date", nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name="status", nullable = false)
    private LessonStatus status;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @Column(name="user_id", nullable = false)
    private Long user_id;

    //V - vjezbaliste, C - cesta (indikatorska varijabla)
    @ManyToOne
    @JoinColumn(name = "field_id", nullable = false)
    private Field field;


    public DrivingHours() {
    }

    public DrivingHours(Field field, LocalDate date, LessonStatus status, String note, Long user_id) {
        this.field = field;
        this.date = date;
        this.status = status;
        this.note = note;
        this.user_id = user_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Field getField() {
        return field;
    }

    public void setField(Field field) {
        this.field = field;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LessonStatus getStatus() {
        return this.status;
    }

    public void setStatus(LessonStatus status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}
