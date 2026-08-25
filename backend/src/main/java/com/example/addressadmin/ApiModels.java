package com.example.addressadmin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.List;
import java.util.Map;

final class ApiModels {
    private ApiModels() {}

    record UserSummary(long id, String email, String firstName, String lastName, int addressCount) {}

    record UserDetail(long id, String email, String firstName, String lastName,
                      List<AddressResponse> addresses) {}

    record AddressResponse(long id, String label, String line1, String line2, String city,
                           String state, String postalCode, String country) {}

    record ProfileRequest(
            @NotBlank @Email @Size(max = 254) String email,
            @NotBlank @Size(max = 100) String firstName,
            @NotBlank @Size(max = 100) String lastName) {}

    record AddressRequest(
            @NotBlank @Size(max = 50) String label,
            @NotBlank @Size(max = 200) String line1,
            @Size(max = 200) String line2,
            @NotBlank @Size(max = 100) String city,
            @NotBlank @Size(max = 100) String state,
            @NotBlank @Size(max = 20) String postalCode,
            @NotBlank @Size(max = 100) String country) {}

    record ApiError(Instant timestamp, int status, String error, String message,
                    String path, Map<String, String> fieldErrors) {}
}
