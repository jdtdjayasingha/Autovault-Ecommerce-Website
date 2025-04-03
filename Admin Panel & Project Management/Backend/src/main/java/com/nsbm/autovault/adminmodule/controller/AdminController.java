package com.nsbm.autovault.adminmodule.controller;

import com.nsbm.autovault.adminmodule.dto.ProductDTO;
import com.nsbm.autovault.adminmodule.model.ImageEntity;
import com.nsbm.autovault.adminmodule.model.Product;
import com.nsbm.autovault.adminmodule.service.AdminService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Product CRUD
    @GetMapping("/products")
    public List<ProductDTO> getAllProducts() {
        return adminService.getAllProducts();
    }

    @PostMapping("/products")
    public ProductDTO saveProduct(@RequestBody ProductDTO productDTO) {
        return adminService.saveProduct(productDTO);
    }

    @PutMapping("/products")
    public ProductDTO updateProduct(@RequestBody ProductDTO productDTO) {
        return adminService.updateProduct(productDTO);
    }

    @DeleteMapping("/products")
    public String deleteProduct(@RequestBody ProductDTO productDTO) {
        return adminService.deleteProduct(productDTO);
    }

    // Image CRUD
    @PostMapping("/images/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            ImageEntity image = adminService.saveImage(file);
            return ResponseEntity.ok("Image uploaded successfully! ID: " + image.getId());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        ImageEntity image = adminService.getImage(id);
        if (image == null) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Adjust based on image type
        return new ResponseEntity<>(image.getImageData(), headers, HttpStatus.OK);
    }

    @GetMapping("/images")
    public ResponseEntity<List<ImageEntity>> getAllImages() {
        List<ImageEntity> images = adminService.getAllImages();
        if (images.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(images);
    }

    @PutMapping("/images/{id}")
    public ResponseEntity<String> updateImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            ImageEntity updatedImage = adminService.updateImage(id, file);
            if (updatedImage == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
            }
            return ResponseEntity.ok("Image updated successfully! ID: " + updatedImage.getId());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating image");
        }
    }

    @DeleteMapping("/images/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {
        boolean isDeleted = adminService.deleteImage(id);
        if (!isDeleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
        }
        return ResponseEntity.ok("Image deleted successfully");
    }
}
