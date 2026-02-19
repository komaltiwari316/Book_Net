package com.bookstore.BookStore.UserModel;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "Orders")
public class Order {
    @Id
    private String id;

    @Field("userid")
    private String userid;

    @Field("userName")
    private String userName;

    @Field("userEmail")
    private String userEmail;

    @Field("userPhoneNum")
    private String userPhoneNum;

    @Field("items")
    private List<OrderItme> items;

    @Field("totalAmount")
    private  int totalAmount;

   public Order(){}

    public Order(String id, String userid, String userName,String userEmail, String Phonenum, List<OrderItme> items, int totalAmount){
        this.id=id;
        this.userid=userid;
        this.userName=userName;
        this.userEmail=userEmail;
        this.userPhoneNum=Phonenum;
        this.totalAmount=totalAmount;
        this.items=items;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<OrderItme> getItems() {
        return items;
    }

    public void setItems(List<OrderItme> items) {
        this.items = items;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPhoneNum() {
        return userPhoneNum;
    }

    public void setUserPhoneNum(String userPhoneNum) {
        this.userPhoneNum = userPhoneNum;
    }
}
