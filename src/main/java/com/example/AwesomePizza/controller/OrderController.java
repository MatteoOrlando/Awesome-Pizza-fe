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
        int queueSize = orderRepository.findAll().size();
        order.setQueuePosition(queueSize + 1); // positioning order at last spot
        return orderRepository.save(order);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id , @RequestParam String status) {
        Order order = orderRepository.findById(id).orElseThrow(RuntimeException::new);
        order.setStatus(status);
        if (status.equals ("IN_PROGRESS"))
        {
            order.setQueuePosition(1); //order set in progress will be always first in the queue
        } else if(status.equals ("COMPLETED")){
            order.setQueuePosition(null);
        }
        return orderRepository.save(order);
    }

}
