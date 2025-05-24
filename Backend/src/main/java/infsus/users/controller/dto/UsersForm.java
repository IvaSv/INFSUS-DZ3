package infsus.users.controller.dto;

import infsus.image.controller.dto.ImageDTO;

public class UsersForm {

    private String firstName;
    private String lastName;
    private String role;

    private String email;

    private ImageDTO imageDTO;

    public UsersForm() {
    }

    public UsersForm(String firstName, String lastName, String role, String email, ImageDTO imageDTO) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.imageDTO = imageDTO;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getRole() {
        return role;
    }

    public ImageDTO getImageDTO() {
        return imageDTO;
    }

    public void setImageDTO(ImageDTO imageDTO) {
        this.imageDTO = imageDTO;
    }
}
