package infsus.image.controller;

import infsus.image.controller.dto.ImageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import infsus.image.service.ImageService;

import java.io.IOException;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping("/get")
    public ResponseEntity<ImageDTO> getImage(@RequestHeader("Authorization") String token, @RequestHeader("userEmail") String userEmail ) {
        ImageDTO imageDTO = imageService.get(userEmail);
        return ResponseEntity.ok(imageDTO);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestHeader("Authorization") String token,
                                         @RequestParam("file") MultipartFile file,
                                         @RequestParam("type") String type,
                                         @RequestParam("email") String email) throws IOException {

            imageService.add(file, type, email);

            return ResponseEntity.ok().body("Image uploaded successfully.");

    }

}
