package com.nsbm.autovault.adminmodule.controller;
import com.nsbm.autovault.adminmodule.dto.ProductDTO;
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

    @PostMapping("/saveProduct")
    public ProductDTO saveProduct(@RequestBody ProductDTO productDTO) {
        return productService.saveProduct(productDTO);
    }

    @PutMapping("/updateProduct")
    public ProductDTO updateProduct(@RequestBody ProductDTO productDTO) {
        return productService.updateProduct(productDTO);
    }

    @DeleteMapping("/deleteProduct")
    public String deleteProduct(@RequestBody ProductDTO productDTO) {
        return productService.deleteProduct(productDTO);
    }
}