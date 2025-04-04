package com.nsbm.autovault.adminmodule.model;

import jakarta.persistence.*;

// This marks the class as an entity for the database
@Entity
public class ProductDetails {

    // This is the primary key for the product, it will be auto-generated
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // The name of the product
    private String name;
    // The price of the product
    private double price;
    // A short description of the product
    private String description;
    // This will store the image of the product in binary format
    @Lob
    private byte[] imageData;
    // Getter and setter methods for the fields
    // Get the id of the product
    public Long getId() {
        return id;
    }
    // Set the id of the product
    public void setId(Long id) {
        this.id = id;
    }
    // Get the name of the product
    public String getName() {
        return name;
    }
    // Set the name of the product
    public void setName(String name) {
        this.name = name;
    }
    // Get the price of the product
    public double getPrice() {
        return price;
    }
    // Set the price of the product
    public void setPrice(double price) {
        this.price = price;
    }
    // Get the description of the product
    public String getDescription() {
        return description;
    }
    // Set the description of the product
    public void setDescription(String description) {
        this.description = description;
    }
    // Get the image data (the product image stored in binary)
    public byte[] getImageData() {
        return imageData;
    }
    // Set the image data (store the product image in binary format)
    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
}
