package com.example.useraddressmanagement.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRequest(

        @Schema(example = "jane.doe@example.com")
        @NotBlank(message = "email is required")
        @Email(message = "email must be valid")
        String email,

        @Schema(example = "Jane")
        @NotBlank(message = "firstName is required")
        String firstName,

        @Schema(example = "Doe")
        @NotBlank(message = "lastName is required")
        String lastName
) {
}
