package com.nsbm.autovault.adminmodule.controller;

import com.nsbm.autovault.adminmodule.model.ProductDetails;
import com.nsbm.autovault.adminmodule.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // ✅ CREATE Product
    @PostMapping("/products")
    public ResponseEntity<String> saveProduct(
            @RequestParam("name") String name,
            @RequestParam("file") MultipartFile file) {
        try {
            ProductDetails product = adminService.saveProduct(name, file);
            return ResponseEntity.ok("Product saved successfully! ID: " + product.getId());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving product");
        }
    }

    // ✅ READ (Get All Products)
    @GetMapping("/products")
    public ResponseEntity<List<ProductDetails>> getAllProducts() {
        List<ProductDetails> products = adminService.getAllProducts();
        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(products);
    }

    // ✅ UPDATE Product
    @PutMapping("/products/{id}")
    public ResponseEntity<String> updateProduct(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Optional<ProductDetails> updatedProduct = adminService.updateProduct(id, name, file);
            if (updatedProduct.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }
            return ResponseEntity.ok("Product updated successfully! ID: " + id);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating product");
        }
    }

    // ✅ DELETE Product
    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        boolean isDeleted = adminService.deleteProduct(id);
        if (!isDeleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        return ResponseEntity.ok("Product deleted successfully");
    }
}
