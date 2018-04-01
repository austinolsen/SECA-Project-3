package features;

import com.example.project3monocityrecord.models.User;
import com.example.project3monocityrecord.repositories.UserRepository;
import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;

import static io.restassured.RestAssured.when;
import static org.hamcrest.Matchers.containsString;


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
                "UserOne"
        );

        User secondUser = new User(
                "UserTwo"
        );

        Stream.of(firstUser, secondUser)
                .forEach(user -> {
                    userRepository.save(user);
                });

        when()
                .get("http://localhost:8080/users/")
        .then()
                .statusCode(Matchers.is(200))
                .and().body(containsString("UserOne"))
                .and().body(containsString("UserTwo"));

    }
}
