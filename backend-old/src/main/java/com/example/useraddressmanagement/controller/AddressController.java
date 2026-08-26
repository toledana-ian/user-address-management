package com.example.useraddressmanagement.controller;

import com.example.useraddressmanagement.dto.AddressRequest;
import com.example.useraddressmanagement.dto.AddressResponse;
import com.example.useraddressmanagement.service.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/addresses")
@RequiredArgsConstructor
@Tag(name = "Addresses", description = "Manage a user's addresses (1-to-many with User)")
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    @Operation(summary = "List all addresses for a user")
    public List<AddressResponse> getAddresses(@PathVariable Long userId) {
        return addressService.getAddressesForUser(userId);
    }

    @GetMapping("/{addressId}")
    @Operation(summary = "Get a single address for a user")
    public AddressResponse getAddress(@PathVariable Long userId, @PathVariable Long addressId) {
        return addressService.getAddress(userId, addressId);
    }

    @PostMapping
    @Operation(summary = "Add a new address to a user")
    public ResponseEntity<AddressResponse> createAddress(@PathVariable Long userId,
                                                           @Valid @RequestBody AddressRequest request) {
        AddressResponse created = addressService.createAddress(userId, request);
        return ResponseEntity.created(URI.create("/api/users/" + userId + "/addresses/" + created.id()))
                .body(created);
    }

    @PutMapping("/{addressId}")
    @Operation(summary = "Update an existing address")
    public AddressResponse updateAddress(@PathVariable Long userId, @PathVariable Long addressId,
                                          @Valid @RequestBody AddressRequest request) {
        return addressService.updateAddress(userId, addressId, request);
    }

    @DeleteMapping("/{addressId}")
    @Operation(summary = "Remove an address from a user")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAddress(@PathVariable Long userId, @PathVariable Long addressId) {
        addressService.deleteAddress(userId, addressId);
    }
}
