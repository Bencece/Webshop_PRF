package com.webshopprf2021.springserver.services;

import com.webshopprf2021.springserver.models.Transaction;
import com.webshopprf2021.springserver.models.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository){
        this.transactionRepository = transactionRepository;
    }

    public void addTransaction(Transaction transaction){
        this.transactionRepository.save(transaction);
    }

    public List<Transaction> listTransaction(){
        return this.transactionRepository.findAll();
    }

}
