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

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.StringContains.containsString;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class CrudFeatureTest {

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
    public void shouldAllowCrudForUser() throws Exception {

        User firstUser = new User(
                "UserOne",
                "PassOne"
        );

        User secondUser = new User(
                "UserTwo",
                "PassTwo"
        );

        Stream.of(firstUser, secondUser)
                .forEach(user -> {
                    userRepository.save(user);
                });

        //Get all users test
        when()
                .get("http://localhost:8080/users/")
                .then()
                .statusCode(is(200))
                .and().body(containsString("UserOne"))
                .and().body(containsString("PassTwo"));

        //Post user test
        User userToCreate = new User(
                "UserThree",
                "PassThree"
        );

        given()
                .contentType(JSON)
                .and().body(userToCreate)
                .when()
                .post("http://localhost:8080/users/")
                .then()
                .statusCode(200)
                .and().body(containsString("UserThree"));

        //Get by ID test
        when()
                .get("http://localhost:8080/users/" + secondUser.getId())
                .then()
                .statusCode(is(200))
                .and().body(containsString("UserTwo"))
                .and().body(containsString("PassTwo"));
    }

}
