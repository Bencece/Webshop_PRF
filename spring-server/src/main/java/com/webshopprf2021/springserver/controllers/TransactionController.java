package com.webshopprf2021.springserver.controllers;

import com.webshopprf2021.springserver.models.Product;
import com.webshopprf2021.springserver.models.Transaction;
import com.webshopprf2021.springserver.services.ProductService;
import com.webshopprf2021.springserver.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class TransactionController {

    TransactionService transactionService;
    ProductService productService;

    @Autowired
    public TransactionController(TransactionService transactionService, ProductService productService){
        this.transactionService = transactionService;
        this.productService = productService;
    }

    @PostMapping(path="/addTransaction", consumes = "application/json")
    public String addTransaction(@RequestBody Transaction transaction) {
        try {
            this.productService.addProduct(new Product(transaction.getItemid(), transaction.getName(), transaction.getPrize()));
            this.transactionService.addTransaction(transaction);
            return "Tranzakció sikeresen hozzáadva.";
        } catch (Exception e) {
            System.out.println(e);
            return "Error during the create operation";
        }
    }

}
