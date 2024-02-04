package com.restfulservice.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class ProductController {
    @GetMapping("/")
    public String hello(){
        return "Hello wolrd";
    }
}
