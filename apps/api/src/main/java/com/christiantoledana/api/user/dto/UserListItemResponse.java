package com.christiantoledana.api.user.dto;

public record UserListItemResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        int addressCount
) {
}
