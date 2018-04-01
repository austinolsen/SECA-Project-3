package com.example.project3monocityrecord.repositories;

import com.example.project3monocityrecord.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
