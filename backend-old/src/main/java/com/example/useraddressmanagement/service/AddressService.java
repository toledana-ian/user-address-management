package com.example.useraddressmanagement.service;

import com.example.useraddressmanagement.dto.AddressRequest;
import com.example.useraddressmanagement.dto.AddressResponse;
import com.example.useraddressmanagement.entity.Address;
import com.example.useraddressmanagement.entity.User;
import com.example.useraddressmanagement.exception.ResourceNotFoundException;
import com.example.useraddressmanagement.repository.AddressRepository;
import com.example.useraddressmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<AddressResponse> getAddressesForUser(Long userId) {
        assertUserExists(userId);
        return addressRepository.findByUserId(userId).stream()
                .map(AddressResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public AddressResponse getAddress(Long userId, Long addressId) {
        return AddressResponse.from(findAddressOrThrow(userId, addressId));
    }

    public AddressResponse createAddress(Long userId, AddressRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));

        Address address = Address.builder()
                .label(request.label())
                .street(request.street())
                .city(request.city())
                .state(request.state())
                .postalCode(request.postalCode())
                .country(request.country())
                .primary(request.primary())
                .build();

        user.addAddress(address);
        Address saved = addressRepository.save(address);
        return AddressResponse.from(saved);
    }

    public AddressResponse updateAddress(Long userId, Long addressId, AddressRequest request) {
        Address address = findAddressOrThrow(userId, addressId);
        address.setLabel(request.label());
        address.setStreet(request.street());
        address.setCity(request.city());
        address.setState(request.state());
        address.setPostalCode(request.postalCode());
        address.setCountry(request.country());
        address.setPrimary(request.primary());
        return AddressResponse.from(address);
    }

    public void deleteAddress(Long userId, Long addressId) {
        Address address = findAddressOrThrow(userId, addressId);
        addressRepository.delete(address);
    }

    private void assertUserExists(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id " + userId);
        }
    }

    private Address findAddressOrThrow(Long userId, Long addressId) {
        return addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Address not found with id " + addressId + " for user " + userId));
    }
}
