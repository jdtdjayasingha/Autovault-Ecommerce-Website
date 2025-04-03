package com.nsbm.autovault.adminmodule.controller;

import com.nsbm.autovault.adminmodule.model.ImageEntity;
import com.nsbm.autovault.adminmodule.service.ImageService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/images")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            ImageEntity image = imageService.saveImage(file);
            return ResponseEntity.ok("Image uploaded successfully! ID: " + image.getId());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        ImageEntity image = imageService.getImage(id);
        if (image == null) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Adjust based on image type
        return new ResponseEntity<>(image.getImageData(), headers, HttpStatus.OK);
    }

    // New endpoint to show all images
    @GetMapping("/")
    public ResponseEntity<List<ImageEntity>> getAllImages() {
        List<ImageEntity> images = imageService.getAllImages();
        if (images.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(images);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            ImageEntity updatedImage = imageService.updateImage(id, file);
            if (updatedImage == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
            }
            return ResponseEntity.ok("Image updated successfully! ID: " + updatedImage.getId());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating image");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {
        boolean isDeleted = imageService.deleteImage(id);
        if (!isDeleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
        }
        return ResponseEntity.ok("Image deleted successfully");
    }

}
