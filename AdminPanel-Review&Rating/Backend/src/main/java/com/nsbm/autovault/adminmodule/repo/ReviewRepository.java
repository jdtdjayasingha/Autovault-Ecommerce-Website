package com.nsbm.autovault.adminmodule.repo;

import com.nsbm.autovault.adminmodule.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductId(Long productId);
}
