package com.nsbm.autovault.adminmodule.repo;

import com.nsbm.autovault.adminmodule.model.ProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;

// This interface allows CRUD operations for ProductDetails in the database.
public interface ProductDetailsRepository extends JpaRepository<ProductDetails, Long> {
}

