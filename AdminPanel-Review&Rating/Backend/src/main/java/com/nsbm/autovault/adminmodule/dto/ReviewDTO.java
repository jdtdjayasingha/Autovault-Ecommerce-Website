package com.nsbm.autovault.adminmodule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class ReviewDTO {

    private int id;
    private String comment;
    private Integer rating;
    private int productId;


}
