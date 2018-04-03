package com.example.project3monocityrecord.features;

import com.example.project3monocityrecord.models.User;
import com.example.project3monocityrecord.repositories.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;

import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.Condition.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UsersUIFeatureTest {

    @Autowired
    private UserRepository userRepository;

    @Before
    public void setUp() {
        userRepository.deleteAll();
    }

    @After
    public void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    public void shouldAllowFullCrudFunctionalityForAUser() throws Exception {
        User firstUser = new User(
                "FeatName",
                "FeatPass"
        );

        firstUser = userRepository.save(firstUser);
        Long firstUserId = firstUser.getId();

        User secondUser = new User(
                "SecName",
                "SecPass"
        );

        secondUser = userRepository.save(secondUser);
        Long secondUserId = secondUser.getId();

        System.setProperty("selenide.browser", "Chrome");
        open("http://localhost:3000");
        $$("[data-user-display]").shouldHaveSize(2);

    }
}
