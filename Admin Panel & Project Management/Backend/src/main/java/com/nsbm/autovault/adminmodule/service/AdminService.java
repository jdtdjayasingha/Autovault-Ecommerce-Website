package com.nsbm.autovault.adminmodule.service;

import com.nsbm.autovault.adminmodule.model.ProductDetails;
import com.nsbm.autovault.adminmodule.repo.ProductDetailsRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@Service
public class AdminService {

    private final ProductDetailsRepository productDetailsRepository;

    public AdminService(ProductDetailsRepository productDetailsRepository) {
        this.productDetailsRepository = productDetailsRepository;
    }

    public ProductDetails saveProduct(String name, MultipartFile file) throws IOException {
        ProductDetails product = new ProductDetails();
        product.setName(name);
        product.setImageData(file.getBytes());
        return productDetailsRepository.save(product);
    }

    public List<ProductDetails> getAllProducts() {
        return productDetailsRepository.findAll();
    }
}

