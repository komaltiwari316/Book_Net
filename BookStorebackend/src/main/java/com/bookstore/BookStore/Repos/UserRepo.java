package com.bookstore.BookStore.Repos;

import com.bookstore.BookStore.UserModel.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User,String> {
    List<User> findByRole(String Role);
    Optional<User> findByEmail(String email);
}
