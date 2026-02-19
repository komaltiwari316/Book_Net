package com.bookstore.BookStore.Services;

import com.bookstore.BookStore.Repos.OrderRepo;
import com.bookstore.BookStore.UserModel.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServ {
    @Autowired
    private OrderRepo orderrpo;

    //save order
    public Order placeOrder(Order order){
        return orderrpo.save(order);
    }

    // get all order
    public List<Order> getAllOrder(){
        return orderrpo.findAll();
    }
}
