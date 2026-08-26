package com.christiantoledana.api.user;

import com.christiantoledana.api.address.AddressModel;
import com.christiantoledana.api.address.AddressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final AddressService addressService;

    public UserController(UserService userService, AddressService addressService) {
        this.userService = userService;
        this.addressService = addressService;
    }

    //========== CRUD for user ==========
    @GetMapping("/")
    public List<UserModel> index() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public UserModel getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping("/")
    public UserModel createUser(@RequestBody UserModel user) {
        return userService.create(user);
    }

    @PatchMapping("/{id}")
    public UserModel updateUser(@PathVariable Long id, @RequestBody UserModel user) {
        return userService.update(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }

    //========== CRUD for user's address ==========
    @GetMapping("/{userId}/addresses")
    public String getUserAddresses(@PathVariable Long userId) {
        return "user "+userId+" list of addresses ";
    }

    @PostMapping("/{userId}/addresses")
    public AddressModel createUserAddress(@PathVariable Long userId, @RequestBody AddressModel address) {
        return addressService.create(userId, address);
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
    public AddressModel setPrimaryUserAddress(@PathVariable Long userId, @PathVariable Long id) {
        return addressService.setPrimary(userId, id);
    }

}

