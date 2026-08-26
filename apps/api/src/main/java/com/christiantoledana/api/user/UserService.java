package com.christiantoledana.api.user;

import java.util.List;

import org.springframework.stereotype.Service;

import com.christiantoledana.api.common.exception.ResourceNotFoundException;
import com.christiantoledana.api.user.dto.AddressResponse;
import com.christiantoledana.api.user.dto.CreateAddressRequest;
import com.christiantoledana.api.user.dto.UpdateAddressRequest;
import com.christiantoledana.api.user.dto.UpdateUserRequest;
import com.christiantoledana.api.user.dto.UserDetailResponse;
import com.christiantoledana.api.user.dto.UserListItemResponse;
import com.christiantoledana.api.user.model.Address;
import com.christiantoledana.api.user.model.User;

@Service
public class UserService {

    private final InMemoryUserRepository userRepository;

    public UserService(InMemoryUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserListItemResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toListItem)
                .toList();
    }

    public UserDetailResponse getUserById(Long id) {
        return toDetail(findUserOrThrow(id));
    }

    public UserDetailResponse updateUser(Long id, UpdateUserRequest request) {
        User user = findUserOrThrow(id);
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        return toDetail(user);
    }

    public AddressResponse addAddress(Long userId, CreateAddressRequest request) {
        User user = findUserOrThrow(userId);
        Address address = new Address(
                userRepository.nextAddressId(),
                request.label(),
                request.street(),
                request.city(),
                request.state(),
                request.postalCode(),
                request.country(),
                request.primary()
        );
        if (address.isPrimary()) {
            clearPrimary(user);
        }
        user.getAddresses().add(address);
        return toAddressResponse(address);
    }

    public AddressResponse updateAddress(Long userId, Long addressId, UpdateAddressRequest request) {
        User user = findUserOrThrow(userId);
        Address address = findAddressOrThrow(user, addressId);
        address.setLabel(request.label());
        address.setStreet(request.street());
        address.setCity(request.city());
        address.setState(request.state());
        address.setPostalCode(request.postalCode());
        address.setCountry(request.country());
        if (request.primary()) {
            clearPrimary(user);
        }
        address.setPrimary(request.primary());
        return toAddressResponse(address);
    }

    public void deleteAddress(Long userId, Long addressId) {
        User user = findUserOrThrow(userId);
        Address address = findAddressOrThrow(user, addressId);
        user.getAddresses().remove(address);
    }

    private void clearPrimary(User user) {
        user.getAddresses().forEach(a -> a.setPrimary(false));
    }

    private User findUserOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }

    private Address findAddressOrThrow(User user, Long addressId) {
        return user.getAddresses().stream()
                .filter(a -> a.getId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Address not found with id " + addressId + " for user " + user.getId()));
    }

    private UserListItemResponse toListItem(User user) {
        return new UserListItemResponse(
                user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getAddresses().size());
    }

    private UserDetailResponse toDetail(User user) {
        List<AddressResponse> addresses = user.getAddresses().stream()
                .map(this::toAddressResponse)
                .toList();
        return new UserDetailResponse(
                user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), addresses);
    }

    private AddressResponse toAddressResponse(Address address) {
        return new AddressResponse(
                address.getId(), address.getLabel(), address.getStreet(), address.getCity(),
                address.getState(), address.getPostalCode(), address.getCountry(), address.isPrimary());
    }
}
