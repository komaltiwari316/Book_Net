package com.bookstore.BookStore.Services;


import com.bookstore.BookStore.Repos.UserRepo;
import com.bookstore.BookStore.UserModel.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServices {

    @Autowired
    private UserRepo userepo;

    // create admin
    public User createAdmin(User admin){
        admin.setRole("Admin");
        return userepo.save(admin);
    }

    //admin login
    public User adminLogin(String email, String password){
        User admin=userepo.findByEmail(email).orElseThrow(()->new RuntimeException("Admin Not found"));

        if(!admin.getPassword().equals(password)){
            throw new RuntimeException("Wrong password");
        }

        if(!admin.getRole().equals("Admin")){
            throw new RuntimeException("Not a Admin");
        }
        return admin;
    }
}
