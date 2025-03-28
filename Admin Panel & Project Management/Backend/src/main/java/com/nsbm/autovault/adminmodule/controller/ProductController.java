package com.nsbm.autovault.adminmodule.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/v1/product")
@CrossOrigin

public class ProductController {
    @GetMapping("/getProduct")
    public String getProduct() {
        return "Toyota";
    }

    @PostMapping("/saveProduct")
    public String saveProduct() {
        return "Product Saved!";
    }

    @PutMapping("/updateProduct")
    public String updateProduct() {
        return "Product Updated!";
    }

    @DeleteMapping("/deleteProduct")
    public String deleteProduct() {
        return "Product Deleted!";
    }
}
