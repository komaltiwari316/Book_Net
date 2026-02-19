package com.bookstore.BookStore.Repos;

import com.bookstore.BookStore.UserModel.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepo extends MongoRepository<Book, String> {
}
