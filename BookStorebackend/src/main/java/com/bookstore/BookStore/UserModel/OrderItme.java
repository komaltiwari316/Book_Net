package com.bookstore.BookStore.UserModel;

import org.springframework.data.mongodb.core.aggregation.BooleanOperators;
import org.springframework.data.mongodb.core.mapping.Field;

public class OrderItme {

    @Field("bookName")
    private String bookName;

    @Field("quantity")
    private int quantity;

    @Field("price")
    private double price;

    public OrderItme(){}

    public OrderItme(String bookName, int quantity, double price){
        this.bookName=bookName;
        this.quantity=quantity;
        this.price=price;
    }


    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
