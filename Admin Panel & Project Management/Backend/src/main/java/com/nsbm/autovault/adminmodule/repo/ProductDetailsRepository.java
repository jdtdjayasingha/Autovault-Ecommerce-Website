package com.nsbm.autovault.adminmodule.repo;

import com.nsbm.autovault.adminmodule.model.ProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductDetailsRepository extends JpaRepository<ProductDetails, Long> {

    @Query("SELECT p FROM ProductDetails p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<ProductDetails> searchProducts(String keyword);
}
