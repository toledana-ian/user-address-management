package com.example.useraddressmanagement.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record AddressRequest(

        @Schema(example = "Home")
        @NotBlank(message = "label is required")
        String label,

        @Schema(example = "123 Main St")
        @NotBlank(message = "street is required")
        String street,

        @Schema(example = "Springfield")
        @NotBlank(message = "city is required")
        String city,

        @Schema(example = "IL")
        String state,

        @Schema(example = "62704")
        @NotBlank(message = "postalCode is required")
        String postalCode,

        @Schema(example = "USA")
        @NotBlank(message = "country is required")
        String country,

        @Schema(example = "false")
        boolean primary
) {
}
