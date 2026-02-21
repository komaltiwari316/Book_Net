package com.bookstore.BookStore.Controller;

import com.bookstore.BookStore.Services.UserServices;
import com.bookstore.BookStore.UserModel.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "https://book-net-five.vercel.app/")
public class UserController {

    @Autowired
    private UserServices userservice;

    // Signup 
    @PostMapping("/signup")
    public ResponseEntity<?> AddUser(@RequestBody User user){
        try {
            User newUser = userservice.AddUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody User user){
        User existingUser = userservice.getUserByemail(user.getEmail());
        if(existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        if(!existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }
        return ResponseEntity.ok(existingUser);
    }

    // get all user
    @GetMapping("/allusers")
    public List<User> getAllUsers(){
        return userservice.getAllUser();
    }
}

