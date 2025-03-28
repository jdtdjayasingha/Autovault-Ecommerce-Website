package com.nsbm.autovault.adminmodule.controller;
import com.nsbm.autovault.adminmodule.dto.ProductDTO;
import com.nsbm.autovault.adminmodule.repo.ProductRepo;
import com.nsbm.autovault.adminmodule.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/product")
@CrossOrigin

public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/getProduct")
    public List<ProductDTO> getProduct() {
        return productService.getALlProducts();
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
