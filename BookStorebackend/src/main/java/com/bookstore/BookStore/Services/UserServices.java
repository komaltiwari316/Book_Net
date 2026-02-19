package com.bookstore.BookStore.Services;

import com.bookstore.BookStore.Repos.UserRepo;
import com.bookstore.BookStore.UserModel.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserServices {

    @Autowired
    private UserRepo userepo;

    //add user
    public User AddUser(User user){
        return userepo.save(user);
    }
    //login user
    public User getUserByemail(String email){
        return userepo.findByEmail(email).orElse(null);
    }
    // get all user
    public List<User> getAllUser(){
        return userepo.findByRole("User");
    }
}
