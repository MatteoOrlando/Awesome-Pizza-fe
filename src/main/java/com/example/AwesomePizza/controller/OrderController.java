package com.example.AwesomePizza.controller;


import com.example.AwesomePizza.entities.Order;
import com.example.AwesomePizza.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/")
    public Order createOrder(){
        Order order = new Order();
        order.setStatus("NEW");
        return orderRepository.save(order);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id)
    {
        Order order = orderRepository.findById(id).orElseThrow(RuntimeException::new);
        order.setStatus(("COMPLETED"));
        return orderRepository.save(order);
    }

}
