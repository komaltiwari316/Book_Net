package com.bookstore.BookStore.Repos;

import com.bookstore.BookStore.UserModel.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepo extends MongoRepository<Order,String> {
}
