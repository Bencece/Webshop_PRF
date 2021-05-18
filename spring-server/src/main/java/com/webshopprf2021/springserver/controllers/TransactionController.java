package com.webshopprf2021.springserver.controllers;

import com.webshopprf2021.springserver.models.Transaction;
import com.webshopprf2021.springserver.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class TransactionController {

    TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
    }

    @PostMapping(path="/addTransaction", consumes = "application/json")
    public String addTransaction(@RequestBody Transaction transaction) {
        try {
            this.transactionService.addTransaction(transaction);
            return "Tranzakció sikeresen hozzáadva.";
        } catch (Exception e) {
            System.out.println(e);
            return "Error during the create operation";
        }
    }

}
