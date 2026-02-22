package com.bookstore.BookStore.Controller;
import com.bookstore.BookStore.Services.BookServ;
import com.bookstore.BookStore.UserModel.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "https://book-net-d7db.vercel.app/")
public class BookController {

    @Autowired
    private BookServ bookServ;

    // ✅ ADD BOOK API
    @PostMapping("/add")
    public Book addBook(
            @RequestParam String title,
            @RequestParam String author,
            @RequestParam int price,
            @RequestParam String category,
            @RequestParam(required = false) MultipartFile image
    ) throws Exception {

        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setPrice(price);
        book.setCategory(category);

        return bookServ.addBook(book, image);
    }

    // ✅ UPDATE BOOK API
    @PutMapping("/update/{id}")
    public Book updateBook(
            @PathVariable String id,
            @RequestParam String title,
            @RequestParam String author,
            @RequestParam int price,
            @RequestParam String category,
            @RequestParam(required = false) MultipartFile image
    ) throws Exception {

        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setPrice(price);
        book.setCategory(category);

        return bookServ.updateBook(id, book, image);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBook(@PathVariable String id){
        bookServ.deleteBook(id);
    }

    @GetMapping("/all")
    public List<Book> GetAllBooks(){
        return bookServ.getAllBooks();
    }
}
