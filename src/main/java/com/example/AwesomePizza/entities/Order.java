package com.example.AwesomePizza.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String status;  // NEW, IN_PROCESS, COMPLETED
    private LocalDateTime orderTime = LocalDateTime.now();


    //Attribute's Value return//
    public Long getId() {
        return Id;
    }

    //Attribute's Value set//
    public void setId(Long id){
        this.Id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }
}
