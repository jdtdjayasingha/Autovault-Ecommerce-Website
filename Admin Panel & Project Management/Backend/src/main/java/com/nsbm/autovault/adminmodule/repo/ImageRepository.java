package com.nsbm.autovault.adminmodule.repo;

import com.nsbm.autovault.adminmodule.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}

