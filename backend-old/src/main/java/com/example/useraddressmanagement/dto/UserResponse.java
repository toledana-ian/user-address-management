package com.example.useraddressmanagement.dto;

import com.example.useraddressmanagement.entity.User;

import java.util.List;

public record UserResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        List<AddressResponse> addresses
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getAddresses().stream().map(AddressResponse::from).toList()
        );
    }
}
