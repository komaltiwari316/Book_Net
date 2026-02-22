package com.bookstore.BookStore.Controller;

import com.bookstore.BookStore.Services.OrderServ;
import com.bookstore.BookStore.UserModel.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "https://book-net-y9rj.vercel.app/")
public class OrderController {

    @Autowired
    private OrderServ orderSev;

    @PostMapping("/place")
    public Order PlaceOrder(@RequestBody Order order){
        return orderSev.placeOrder(order);
    }

    @GetMapping("/all")
    public List<Order> getAllOrder(){
        return orderSev.getAllOrder();
    }
}
