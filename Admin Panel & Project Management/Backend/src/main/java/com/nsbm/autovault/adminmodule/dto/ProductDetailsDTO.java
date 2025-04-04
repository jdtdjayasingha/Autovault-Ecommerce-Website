package com.nsbm.autovault.adminmodule.dto;

public class ProductDetailsDTO {

    private String name; // The name of the product
    private byte[] imageData; // The image of the product stored as a byte array
    private double price; // The price of the product
    private String description; // A short description of the product
    // Getter method for the product's name
    public String getName() {
        return name;
    }
    // Setter method to set the product's name
    public void setName(String name) {
        this.name = name;
    }
    // Getter method for the product's image data
    public byte[] getImageData() {
        return imageData;
    }
    // Setter method to set the product's image data
    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
    // Getter method for the product's price
    public double getPrice() {
        return price;
    }
    // Setter method to set the product's price
    public void setPrice(double price) {
        this.price = price;
    }
    // Getter method for the product's description
    public String getDescription() {
        return description;
    }
    // Setter method to set the product's description
    public void setDescription(String description) {
        this.description = description;
    }
}
