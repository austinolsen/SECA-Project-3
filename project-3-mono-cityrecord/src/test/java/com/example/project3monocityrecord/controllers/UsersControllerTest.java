package com.example.project3monocityrecord.controllers;

import com.example.project3monocityrecord.models.User;
import com.example.project3monocityrecord.repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(UsersController.class)
public class UsersControllerTest {

    @MockBean
    private UserRepository mockUserRepository;

    @Before
    public void setUp() {
        User firstUser = new User(
                "UserOne",
                "PassOne"
        );

        User secondUser = new User(
                "SecondUser",
                "PassTwo"
        );

        List<User> mockUsers =
                Stream.of(firstUser, secondUser).collect(Collectors.toList());

        given(mockUserRepository.findAll()).willReturn(mockUsers);

//        given(mockUserRepository.findOne()).willReturn(firstUser);
    }

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void findAllUsers_suc_returnAllUsersAsJSON() throws Exception {

        this.mockMvc
                .perform(get("/users"))
                .andExpect(jsonPath("$", hasSize(2)));
    }


    @Test
    public void findAll_suc_returnsStatusOK() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(status().isOk());
    }

    @Test
    public void findAllUsers_suc_returnUserNameForEach() throws Exception {

        this.mockMvc
                .perform(get("/users"))
                .andExpect(jsonPath("$[0].userName", is("UserOne")));
    }

    @Test
    public void findAllUsers_suc_returnPasswordForEach() throws Exception {

        this.mockMvc
                .perform(get("/users"))
                .andExpect(jsonPath("$[1].password", is("PassTwo")));
    }

    @Test
    public void findUserById_suc_returnStatusOk() throws Exception {

        this.mockMvc
                .perform(get("/users/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void findUserById_suc_returnUserName() throws Exception {

        this.mockMvc
                .perform(get("/users/1"))
                .andExpect(jsonPath("$.userName", is("UserOne")));
    }

    @Test
    public void findUserById_suc_returnPassword() throws Exception {

        this.mockMvc
                .perform(get("/users/1"))
                .andExpect(jsonPath("$.password", is("PassOne")));
    }

    @Test
    public void deleteUserById_suc_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(delete("/users/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteUserById_suc_deletesViaRepository() throws Exception{

        this.mockMvc.perform(delete("/users/1"));

//        verify(mockUserRepository, times(1)).delete(User 1L);
    }



    //Unhappy

    @Test
    public void findUserById_fail_userNotFound404() throws Exception {

        this.mockMvc
                .perform(get("/users/4"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void findUserById_fail_userNotFoundError() throws Exception {

        this.mockMvc
                .perform(get("/users/4"))
                .andExpect(status().reason(containsString("User with ID of 4 was not found.")));
    }


}
