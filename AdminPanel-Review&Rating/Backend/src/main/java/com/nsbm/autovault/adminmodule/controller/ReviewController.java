package com.nsbm.autovault.adminmodule.controller;

import com.nsbm.autovault.adminmodule.dto.ReviewDTO;
import com.nsbm.autovault.adminmodule.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/reviews")
@CrossOrigin

public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/getReviews")
    public List<ReviewDTO> getReviews() {
        return reviewService.getAllReviews();
    }

    @PostMapping("/saveReview")
    public ReviewDTO saveReview(@RequestBody ReviewDTO reviewDTO) {
        return reviewService.saveReview(reviewDTO);
    }

    @PutMapping("/updateReview")
    public ReviewDTO updateReview(@RequestBody ReviewDTO reviewDTO) {
        return reviewService.updateReview(reviewDTO);
    }

    @DeleteMapping("/deleteReview")
    public String deleteReview(@RequestBody ReviewDTO reviewDTO) {
        return reviewService.deleteReview(reviewDTO);
    }

    @GetMapping("/getReviewsByProductId/{productId}")
    public List<ReviewDTO> getReviewsByProductId(@PathVariable Long productId) {
        return reviewService.getReviewsByProductId(productId);
    }

}
