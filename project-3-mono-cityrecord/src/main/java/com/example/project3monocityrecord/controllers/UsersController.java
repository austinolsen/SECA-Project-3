package com.example.project3monocityrecord.controllers;

import com.example.project3monocityrecord.models.User;
import com.example.project3monocityrecord.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UsersController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/")
    public String home() {
        return "Test Spring Home Page";
    }

    @GetMapping("/users/{userId}")
    public Optional<User> findeUserById(@PathVariable Long userId) {
        return userRepository.findById(userId);
    }

    @PostMapping("/users")
    public User createNewUser (@RequestBody User newUser) {
        return  userRepository.save(newUser);
    }
}