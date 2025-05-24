package infsus.driving.hours.entity;

public enum LessonStatus {

    USPJEH("uspješno savladano"),
    NEUSPJEH("neuspješno savladano"),
    DODATNO_VJEZBATI("solidan pokušaj: dodatno vježbati");

    private String status;

    LessonStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return this.status;
    }
}
