package com.bookstore.BookStore.Services;
import com.bookstore.BookStore.Repos.BookRepo;
import com.bookstore.BookStore.UserModel.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class BookServ {

    @Autowired
    private BookRepo bookrepo;

    private final String UPLOAD_DIR=System.getProperty("user.dir")+"/uploads/";

    // add book
    public Book addBook(Book book , MultipartFile image) throws IOException {
        if(image!=null && !image.isEmpty()){
            File uploadDir=new File(UPLOAD_DIR);
            if(!uploadDir.exists()){
                uploadDir.mkdirs();
            }
            String fileName = System.currentTimeMillis() + "_" +
                    image.getOriginalFilename().replaceAll("\\s+", "_");

            File file=new File(uploadDir,fileName);
            image.transferTo(file);
            book.setImage(fileName);
        }
        return bookrepo.save(book);
    }

    //update book
    public Book updateBook(String id, Book book, MultipartFile image) throws IOException {
        Book oldBook=bookrepo.findById(id).orElseThrow();

        oldBook.setTitle(book.getTitle());
        oldBook.setAuthor(book.getAuthor());
        oldBook.setPrice(book.getPrice());
        oldBook.setCategory(book.getCategory());

        if(image!=null && !image.isEmpty()){
            String fileName = System.currentTimeMillis() + "_" +
                    image.getOriginalFilename().replaceAll("\\s+", "_");

            File file=new File(UPLOAD_DIR+fileName);
            file.getParentFile().mkdirs();
            image.transferTo(file);
            oldBook.setImage(fileName);
        }

//        book.setId(id);
        return bookrepo.save(oldBook);
    }

    // delete
    public String deleteBook(String id){
        bookrepo.deleteById(id);
        return "Book has been deleted";
    }

    // get all books
    public List<Book>getAllBooks(){
        return bookrepo.findAll();
    }
}
