package com.nsbm.autovault.adminmodule.service;

import com.nsbm.autovault.adminmodule.model.ProductDetails;
import com.nsbm.autovault.adminmodule.repo.ProductDetailsRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final ProductDetailsRepository productDetailsRepository;

    public AdminService(ProductDetailsRepository productDetailsRepository) {
        this.productDetailsRepository = productDetailsRepository;
    }

    public ProductDetails saveProduct(String name, double price, String description, MultipartFile file) throws IOException {
        ProductDetails product = new ProductDetails();
        product.setName(name);
        product.setPrice(price);  // Set price
        product.setDescription(description);  // Set description

        if (file != null && !file.isEmpty()) {
            product.setImageData(file.getBytes());
        }

        return productDetailsRepository.save(product);
    }

    public List<ProductDetails> getAllProducts() {
        return productDetailsRepository.findAll();
    }

    public Optional<ProductDetails> updateProduct(Long id, String name, double price, String description, MultipartFile file) throws IOException {
        Optional<ProductDetails> existingProduct = productDetailsRepository.findById(id);

        if (existingProduct.isPresent()) {
            ProductDetails product = existingProduct.get();
            product.setName(name);
            product.setPrice(price);  // Update price
            product.setDescription(description);  // Update description

            if (file != null && !file.isEmpty()) {
                product.setImageData(file.getBytes());
            }

            return Optional.of(productDetailsRepository.save(product));
        }
        return Optional.empty();
    }

    public boolean deleteProduct(Long id) {
        if (productDetailsRepository.existsById(id)) {
            productDetailsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
