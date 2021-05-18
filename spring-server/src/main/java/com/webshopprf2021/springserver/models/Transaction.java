package com.webshopprf2021.springserver.models;

import javax.persistence.*;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int itemid;
    private String date;
    private int prize;

    public Transaction(){}

    public Transaction(int id, int itemid, String date, int prize){
        this.id = id;
        this.itemid = itemid;
        this.date = date;
        this.prize = prize;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getItemid() {
        return itemid;
    }

    public void setItemid(int itemid) {
        this.itemid = itemid;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getPrize() {
        return prize;
    }

    public void setPrize(int prize) {
        this.prize = prize;
    }

    @Override
    public String toString(){
        return "[id: "+id+", itemid: "+itemid+", date: "+date+", prize: "+prize+"]";
    }
}
