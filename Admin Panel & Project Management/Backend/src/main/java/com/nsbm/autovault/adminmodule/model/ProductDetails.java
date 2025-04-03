package com.nsbm.autovault.adminmodule.model;

import jakarta.persistence.*;

@Entity
public class ProductDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Ensure this field exists

    private String name;

    @Lob
    private byte[] imageData;

    // Getters and Setters
    public Long getId() {  // Add this method
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
}


