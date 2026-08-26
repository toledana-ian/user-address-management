package com.example.useraddressmanagement.dto;

import com.example.useraddressmanagement.entity.Address;

public record AddressResponse(
        Long id,
        String label,
        String street,
        String city,
        String state,
        String postalCode,
        String country,
        boolean primary
) {
    public static AddressResponse from(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getLabel(),
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getPostalCode(),
                address.getCountry(),
                address.isPrimary()
        );
    }
}
