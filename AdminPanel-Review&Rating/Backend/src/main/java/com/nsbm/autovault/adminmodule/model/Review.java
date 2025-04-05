package com.nsbm.autovault.adminmodule.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Review {

    @Id
    private Long id;
    private String comment;
    private Integer rating;
    private Long productId;

    
}
