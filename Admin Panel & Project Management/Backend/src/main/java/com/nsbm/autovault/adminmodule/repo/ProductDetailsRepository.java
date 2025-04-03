package com.nsbm.autovault.adminmodule.repo;

import com.nsbm.autovault.adminmodule.model.ProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDetailsRepository extends JpaRepository<ProductDetails, Long> {
}

