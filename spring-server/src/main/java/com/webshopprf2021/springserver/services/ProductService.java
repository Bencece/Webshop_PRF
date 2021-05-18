package com.webshopprf2021.springserver.services;

import com.webshopprf2021.springserver.models.Product;
import com.webshopprf2021.springserver.models.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    ProductRepository productRepository;

    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public void addProduct(Product product){
        if(!this.productRepository.existsById(product.getItemid())){
            this.productRepository.save(product);
        }
    }

    public List<Product> listProducts(){
        return this.productRepository.findAll();
    }
}
