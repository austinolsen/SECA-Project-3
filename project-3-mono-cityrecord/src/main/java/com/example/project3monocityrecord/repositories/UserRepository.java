package com.example.project3monocityrecord.repositories;

import com.example.project3monocityrecord.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findAll();
}
