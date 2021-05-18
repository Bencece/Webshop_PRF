package com.webshopprf2021.springserver.controllers;

import com.webshopprf2021.springserver.models.Product;
import com.webshopprf2021.springserver.models.Transaction;
import com.webshopprf2021.springserver.services.ProductService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class ProductController {

    ProductService productService;

    public  ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping(path="/addProduct", consumes = "application/json")
    public String addProduct(@RequestBody Product product) {
        try {
            this.productService.addProduct(product);
            return "Termék sikeresen hozzáadva.";
        } catch (Exception e) {
            System.out.println(e);
            return "Error during the create operation";
        }
    }

}
