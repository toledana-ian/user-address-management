package com.christiantoledana.api.user;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.christiantoledana.api.user.dto.AddressResponse;
import com.christiantoledana.api.user.dto.CreateAddressRequest;
import com.christiantoledana.api.user.dto.UpdateAddressRequest;
import com.christiantoledana.api.user.dto.UpdateUserRequest;
import com.christiantoledana.api.user.dto.UserDetailResponse;
import com.christiantoledana.api.user.dto.UserListItemResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserListItemResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDetailResponse getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public UserDetailResponse updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest request) {
        return userService.updateUser(id, request);
    }

    @PostMapping("/{id}/addresses")
    public ResponseEntity<AddressResponse> addAddress(@PathVariable Long id,
                                                        @Valid @RequestBody CreateAddressRequest request) {
        AddressResponse response = userService.addAddress(id, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}/addresses/{addressId}")
    public AddressResponse updateAddress(@PathVariable Long id, @PathVariable Long addressId,
                                          @Valid @RequestBody UpdateAddressRequest request) {
        return userService.updateAddress(id, addressId, request);
    }

    @DeleteMapping("/{id}/addresses/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id, @PathVariable Long addressId) {
        userService.deleteAddress(id, addressId);
        return ResponseEntity.noContent().build();
    }
}
