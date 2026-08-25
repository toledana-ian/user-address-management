package com.example.addressadmin;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

import static com.example.addressadmin.ApiModels.*;

@RestController
@RequestMapping("/api/users")
class UserController {
    private final UserService service;

    UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    List<UserSummary> listUsers() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    UserDetail getUser(@PathVariable long id) {
        return service.find(id);
    }

    @PutMapping("/{id}")
    UserDetail updateProfile(@PathVariable long id, @Valid @RequestBody ProfileRequest request) {
        return service.updateProfile(id, request);
    }

    @PostMapping("/{id}/addresses")
    ResponseEntity<AddressResponse> createAddress(@PathVariable long id,
                                                  @Valid @RequestBody AddressRequest request) {
        var address = service.addAddress(id, request);
        return ResponseEntity.created(
                URI.create("/api/users/" + id + "/addresses/" + address.id())).body(address);
    }

    @PutMapping("/{id}/addresses/{addressId}")
    AddressResponse updateAddress(@PathVariable long id, @PathVariable long addressId,
                                  @Valid @RequestBody AddressRequest request) {
        return service.updateAddress(id, addressId, request);
    }

    @DeleteMapping("/{id}/addresses/{addressId}")
    ResponseEntity<Void> deleteAddress(@PathVariable long id, @PathVariable long addressId) {
        service.deleteAddress(id, addressId);
        return ResponseEntity.noContent().build();
    }
}
