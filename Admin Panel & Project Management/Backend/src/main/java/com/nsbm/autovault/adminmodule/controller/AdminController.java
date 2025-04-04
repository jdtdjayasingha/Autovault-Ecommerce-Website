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
@RequestMapping("/admin") // This is the base URL for all admin-related endpoints
@CrossOrigin
public class AdminController {

    private final AdminService adminService;

    // Constructor to inject the AdminService into this controller
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // CREATE Product
    @PostMapping("/products") // Endpoint to create a new product
    public ResponseEntity<String> saveProduct(
            @RequestParam("name") String name, // Get product name
            @RequestParam("price") double price, // Get product price
            @RequestParam("description") String description, // Get product description
            @RequestParam("file") MultipartFile file) { // Get the product image file
        try {
            ProductDetails product = adminService.saveProduct(name, price, description, file);
            return ResponseEntity.ok("Product saved successfully! ID: " + product.getId());
        } catch (IOException e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving product");
        }
    }

    // READ (Get All Products)
    @GetMapping("/products") // Endpoint to get all products
    public ResponseEntity<List<ProductDetails>> getAllProducts() {
        List<ProductDetails> products = adminService.getAllProducts(); // Get all products from the service
        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(products);
    }

    // UPDATE Product
    @PutMapping("/products/{id}") // Endpoint to update an existing product by ID
    public ResponseEntity<String> updateProduct(
            @PathVariable Long id, // Get the product ID from the URL
            @RequestParam("name") String name, // Update product name
            @RequestParam("price") double price,  // Update product price
            @RequestParam("description") String description,  // Update product description
            @RequestParam(value = "file", required = false) MultipartFile file) { // Update product image (optional)
        try {
            Optional<ProductDetails> updatedProduct = adminService.updateProduct(id, name, price, description, file);
            if (updatedProduct.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }
            return ResponseEntity.ok("Product updated successfully! ID: " + id);
        } catch (IOException e) {
            // If there's an error updating the product, return an error message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating product");
        }
    }

    // DELETE Product
    @DeleteMapping("/products/{id}") // Endpoint to delete a product by ID
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        boolean isDeleted = adminService.deleteProduct(id); // Attempt to delete the product
        if (!isDeleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        return ResponseEntity.ok("Product deleted successfully");
    }
}
