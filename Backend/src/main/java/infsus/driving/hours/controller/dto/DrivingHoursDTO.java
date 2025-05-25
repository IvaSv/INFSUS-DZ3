package infsus.driving.hours.controller.dto;

import infsus.driving.hours.entity.LessonStatus;

import java.time.LocalDate;

public class DrivingHoursDTO {

    private Long id;

    private String field;
    private LocalDate date;
    private LessonStatus status;
    private String note;


    public DrivingHoursDTO() {
    }

    public DrivingHoursDTO(Long id, String field, LocalDate date, LessonStatus status, String note) {
        this.id = id;
        this.field = field;
        this.date = date;
        this.status = status;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LessonStatus getStatus() {
        return status;
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
}
