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

import static com.codeborne.selenide.CollectionCondition.size;
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
        System.setProperty("selenide.headless", "true");

        open("http://localhost:3000");
        $$("[data-user-display]").shouldHaveSize(2);

        $("#user-" + firstUserId + "-user-name").shouldHave(text("FeatName"));

        $("#user-" + secondUserId + "-user-name").shouldHave(text("SecName"));
        $("#new-user-link").click();

        $("#new-user-form").should(appear);

        $("#new-user-user-name").sendKeys("third_user");
        $("#new-user-submit").click();

        $("#users-wrapper").should(appear);

        $$("[data-user-display]").shouldHaveSize(3);

        Long thirdUserId = secondUserId + 1;
        $("#user-" + thirdUserId + "-user-name").shouldHave(text("third_user"));

        $("#user-" + firstUserId).should(exist);
        $$("[data-user-display]").shouldHaveSize(3);

        $("#delete-user-" + firstUserId).click();
        $("#user-" + firstUserId).shouldNot(exist);

        $$("[data-user-display]").shouldHave(size(2));

    }
}
