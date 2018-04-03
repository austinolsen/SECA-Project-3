package com.example.project3monocityrecord.repositories;

import com.example.project3monocityrecord.models.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void setUp() {
        User firstUser = new User(
                "UserOne",
                "PassOne"
        );

        User secondUser = new User(
                "UserTwo",
                "PassTwo"
        );

        entityManager.persist(firstUser);
        entityManager.persist(secondUser);
        entityManager.flush();
    }

    @Test
    public void findAll_returnsAllUsers() {
        List<User> usersFromDb = userRepository.findAll();
        assertThat(usersFromDb.size(), is(6));
    }

    @Test
    public void findAll_returnsUserName() {
        List<User> usersFromDb = userRepository.findAll();
        String sixthUsersUserName = usersFromDb.get(5).getUserName();

        assertThat(sixthUsersUserName, is("UserTwo"));
    }
}
