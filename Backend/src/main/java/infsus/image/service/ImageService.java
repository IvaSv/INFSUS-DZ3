package infsus.image.service;

import infsus.image.controller.dto.ImageDTO;
import infsus.image.entity.Image;
import infsus.users.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import infsus.cloudinary.configuration.FileUploadService;
import infsus.image.repository.ImageRepository;
import infsus.users.entity.User;

import java.io.IOException;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileUploadService fileUploadService;

    public ImageDTO get(String userEmail){
        User user = userRepository.findUserByEmail(userEmail);
        Image image = imageRepository.findByUserId(user.getId());
        if (image == null) {
            throw new RuntimeException("Image not found for user: " + userEmail);
        }
        return new ImageDTO(image.getPath(), image.getType());
    }

    public void add(MultipartFile multipartFile, String type, String userEmail) throws IOException {
        User user = userRepository.findUserByEmail(userEmail);
        String path = fileUploadService.upload(multipartFile, user.getId(), type);
        Image image = new Image(path, type, user.getId());
        imageRepository.save(image);
    }


}
