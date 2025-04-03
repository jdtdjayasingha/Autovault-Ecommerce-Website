package com.nsbm.autovault.adminmodule.service;

import com.nsbm.autovault.adminmodule.dto.ProductDTO;
import com.nsbm.autovault.adminmodule.model.ImageEntity;
import com.nsbm.autovault.adminmodule.model.Product;
import com.nsbm.autovault.adminmodule.repo.ImageRepository;
import com.nsbm.autovault.adminmodule.repo.ProductRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class AdminService {

    private final ProductRepo productRepo;
    private final ImageRepository imageRepository;
    private final ModelMapper modelMapper;

    public AdminService(ProductRepo productRepo, ImageRepository imageRepository, ModelMapper modelMapper) {
        this.productRepo = productRepo;
        this.imageRepository = imageRepository;
        this.modelMapper = modelMapper;
    }

    // Product operations
    public List<ProductDTO> getAllProducts() {
        List<Product> productList = productRepo.findAll();
        return modelMapper.map(productList, new TypeToken<List<ProductDTO>>(){}.getType());
    }

    public ProductDTO saveProduct(ProductDTO productDTO) {
        productRepo.save(modelMapper.map(productDTO, Product.class));
        return productDTO;
    }

    public ProductDTO updateProduct(ProductDTO productDTO) {
        productRepo.save(modelMapper.map(productDTO, Product.class));
        return productDTO;
    }

    public String deleteProduct(ProductDTO productDTO) {
        productRepo.delete(modelMapper.map(productDTO, Product.class));
        return "Product Deleted";
    }

    // Image operations
    public ImageEntity saveImage(MultipartFile file) throws IOException {
        ImageEntity image = new ImageEntity();
        image.setName(file.getOriginalFilename());
        image.setImageData(file.getBytes());
        return imageRepository.save(image);
    }

    public ImageEntity getImage(Long id) {
        return imageRepository.findById(id).orElse(null);
    }

    public List<ImageEntity> getAllImages() {
        return imageRepository.findAll();
    }

    public ImageEntity updateImage(Long id, MultipartFile file) throws IOException {
        ImageEntity existingImage = imageRepository.findById(id).orElse(null);
        if (existingImage == null) {
            return null;
        }
        existingImage.setName(file.getOriginalFilename());
        existingImage.setImageData(file.getBytes());
        return imageRepository.save(existingImage);
    }

    public boolean deleteImage(Long id) {
        if (!imageRepository.existsById(id)) {
            return false;
        }
        imageRepository.deleteById(id);
        return true;
    }
}
