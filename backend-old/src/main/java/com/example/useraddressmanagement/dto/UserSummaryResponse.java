package com.example.useraddressmanagement.dto;

import com.example.useraddressmanagement.entity.User;

public record UserSummaryResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        int addressCount
) {
    public static UserSummaryResponse from(User user) {
        return new UserSummaryResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getAddresses().size()
        );
    }
}
