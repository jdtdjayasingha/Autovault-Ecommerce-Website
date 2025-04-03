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

    // ✅ CREATE Product
    public ProductDetails saveProduct(String name, MultipartFile file) throws IOException {
        ProductDetails product = new ProductDetails();
        product.setName(name);
        product.setImageData(file.getBytes());
        return productDetailsRepository.save(product);
    }

    // ✅ READ (Get All Products)
    public List<ProductDetails> getAllProducts() {
        return productDetailsRepository.findAll();
    }

    // ✅ UPDATE Product
    public Optional<ProductDetails> updateProduct(Long id, String name, MultipartFile file) throws IOException {
        Optional<ProductDetails> existingProductOpt = productDetailsRepository.findById(id);
        if (existingProductOpt.isEmpty()) {
            return Optional.empty();
        }

        ProductDetails existingProduct = existingProductOpt.get();
        existingProduct.setName(name);
        if (file != null && !file.isEmpty()) {
            existingProduct.setImageData(file.getBytes());
        }
        return Optional.of(productDetailsRepository.save(existingProduct));
    }

    // ✅ DELETE Product
    public boolean deleteProduct(Long id) {
        if (!productDetailsRepository.existsById(id)) {
            return false;
        }
        productDetailsRepository.deleteById(id);
        return true;
    }
}
