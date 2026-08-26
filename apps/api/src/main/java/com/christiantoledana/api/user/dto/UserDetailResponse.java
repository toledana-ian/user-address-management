package com.christiantoledana.api.user.dto;

import java.util.List;

public record UserDetailResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        List<AddressResponse> addresses
) {
}
