//package com.bookstore.BookStore.Controller;
//import com.bookstore.BookStore.DTO.LoginDTO;
//import com.bookstore.BookStore.Services.AdminServices;
//import com.bookstore.BookStore.UserModel.User;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/admin")
//public class AdminController {
//    @Autowired
//    private AdminServices adminservices;
//
//    @PostMapping("/signup")
//    public User signup(@RequestBody User admin){
//        return adminservices.createAdmin(admin);
//    }
//
//    @PostMapping("/login")
//    public User login(@RequestBody LoginDTO request){
//        return adminservices.adminLogin(
//                request.getEmail(),
//                request.getPassword()
//        );
//    }
//}


package com.bookstore.BookStore.Controller;

import com.bookstore.BookStore.DTO.LoginDTO;
import com.bookstore.BookStore.Services.AdminServices;
import com.bookstore.BookStore.UserModel.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminServices adminservices;

    // Signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User admin){
        try {
            User newAdmin = adminservices.createAdmin(admin);
            return ResponseEntity.status(HttpStatus.CREATED).body(newAdmin);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO request){
        try {
            User admin = adminservices.adminLogin(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(admin);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
