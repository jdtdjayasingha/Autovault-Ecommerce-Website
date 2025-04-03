package com.nsbm.autovault.adminmodule.controller;

import com.nsbm.autovault.adminmodule.model.ProductDetails;
import com.nsbm.autovault.adminmodule.service.AdminService;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/products")
    public ResponseEntity<List<ProductDetails>> getAllProducts() {
        List<ProductDetails> products = adminService.getAllProducts();
        return ResponseEntity.ok(products);
    }
}

