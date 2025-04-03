package com.nsbm.autovault.adminmodule.service;

import com.nsbm.autovault.adminmodule.model.ImageEntity;
import com.nsbm.autovault.adminmodule.repo.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public ImageEntity saveImage(MultipartFile file) throws IOException {
        ImageEntity image = new ImageEntity();
        image.setName(file.getOriginalFilename());
        image.setImageData(file.getBytes());
        return imageRepository.save(image);
    }

    public ImageEntity getImage(Long id) {
        return imageRepository.findById(id).orElse(null);
    }

    // New method to fetch all images
    public List<ImageEntity> getAllImages() {
        return imageRepository.findAll();
    }

    public ImageEntity updateImage(Long id, MultipartFile file) throws IOException {
        ImageEntity existingImage = imageRepository.findById(id).orElse(null);
        if (existingImage == null) {
            return null;  // Image not found
        }

        existingImage.setName(file.getOriginalFilename());
        existingImage.setImageData(file.getBytes());
        return imageRepository.save(existingImage);
    }

    public boolean deleteImage(Long id) {
        if (!imageRepository.existsById(id)) {
            return false;  // Image not found
        }
        imageRepository.deleteById(id);
        return true;
    }

}
