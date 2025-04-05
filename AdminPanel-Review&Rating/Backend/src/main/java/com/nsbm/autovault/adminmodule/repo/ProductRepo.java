package com.nsbm.autovault.adminmodule.repo;

import com.nsbm.autovault.adminmodule.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {
}