package com.nsbm.autovault.adminmodule.service;

import com.nsbm.autovault.adminmodule.dto.ReviewDTO;
import com.nsbm.autovault.adminmodule.model.Review;
import com.nsbm.autovault.adminmodule.repo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

import java.util.List;

@Service
@Transactional

public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<ReviewDTO> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return modelMapper.map(reviews, new TypeToken<List<ReviewDTO>>() {}.getType());
    }

    public ReviewDTO saveReview(ReviewDTO reviewDTO) {
        Review review = modelMapper.map(reviewDTO, Review.class);
        reviewRepository.save(review);
        return reviewDTO;
    }
    public ReviewDTO updateReview(ReviewDTO reviewDTO) {
        Review review = modelMapper.map(reviewDTO, Review.class);
        reviewRepository.save(review);
        return reviewDTO;
    }
    public String deleteReview(ReviewDTO reviewDTO) {
        Review review = modelMapper.map(reviewDTO, Review.class);
        reviewRepository.delete(review);
        return "Review Deleted";
    }
    public List<ReviewDTO> getReviewsByProductId(Long productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return modelMapper.map(reviews, new TypeToken<List<ReviewDTO>>() {}.getType());
    }
    
}
