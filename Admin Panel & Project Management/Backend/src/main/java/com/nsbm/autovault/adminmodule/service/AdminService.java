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
        ProductDetails product = new ProductDetails();  // Create a new product object
        product.setName(name);  // Set the product's name
        product.setPrice(price);  // Set the product's price
        product.setDescription(description);  // Set the product's description

        if (file != null && !file.isEmpty()) {
            product.setImageData(file.getBytes());  // Convert the file to byte data and set it in the product
        }
        return productDetailsRepository.save(product);
    }

    public List<ProductDetails> getAllProducts() {
        return productDetailsRepository.findAll();  // Fetch all products from the database
    }

    // Method to update an existing product by ID
    public Optional<ProductDetails> updateProduct(Long id, String name, double price, String description, MultipartFile file) throws IOException {
        Optional<ProductDetails> existingProduct = productDetailsRepository.findById(id);  // Find the product by its ID

        // Check if the product exists
        if (existingProduct.isPresent()) {
            ProductDetails product = existingProduct.get();  // Get the existing product

            // Update the product details
            product.setName(name);  // Update name
            product.setPrice(price);  // Update price
            product.setDescription(description);  // Update description

            if (file != null && !file.isEmpty()) {
                product.setImageData(file.getBytes());  // Convert the file to byte data and update
            }

            // Save the updated product to the database and return the updated product
            return Optional.of(productDetailsRepository.save(product));
        }
        return Optional.empty();  // If the product doesn't exist, return an empty result
    }

    // Method to delete a product by its ID
    public boolean deleteProduct(Long id) {
        if (productDetailsRepository.existsById(id)) {
            productDetailsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
