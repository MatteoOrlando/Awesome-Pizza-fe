package com.example.AwesomePizza.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< Updated upstream
    private Long Id;
    private String status;  // NEW, IN_PROCESS, COMPLETED
    private LocalDateTime orderTime = LocalDateTime.now();

=======
    private Long id;
    private String status;  // NEW, IN_PROGRESS, COMPLETED
    private LocalDateTime orderTime = LocalDateTime.now();
    private Integer queuePosition;
>>>>>>> Stashed changes

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
