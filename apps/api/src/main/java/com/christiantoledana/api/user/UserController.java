package com.christiantoledana.api.user;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    //========== CRUD for user ==========
    @GetMapping("/")
    public String index() {
        return "List of users";
    }

    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id) {
        return "user info of "+id;
    }

    @PostMapping("/{id}")
    public String createUser(@PathVariable Long id) {
        return "create user "+id;
    }

    @PatchMapping("/{id}")
    public String updateUser(@PathVariable Long id) {
        return "update user "+id;
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        return "delete user "+id;
    }

    //========== CRUD for user's address ==========
    @GetMapping("/{userId}/addresses")
    public String getUserAddresses(@PathVariable Long userId) {
        return "user "+userId+" list of addresses ";
    }

    @PostMapping("/{userId}/addresses")
    public String createUserAddress(@PathVariable Long userId) {
        return "create user "+userId+" address ";
    }

    @PatchMapping("/{userId}/addresses/{id}")
    public String updateUserAddress(@PathVariable Long userId, @PathVariable Long id) {
        return "update user "+userId+" address "+id;
    }

    @DeleteMapping("/{userId}/addresses/{id}")
    public String deleteUserAddress(@PathVariable Long userId, @PathVariable Long id) {
        return "delete user "+userId+" address "+id;
    }

    @PatchMapping("/{userId}/addresses/{id}/primary")
    public String setPrimaryUserAddress(@PathVariable Long userId, @PathVariable Long id) {
        return "set user "+userId+" address "+id+" as primary";
    }

}

