package com.example.addressadmin;

import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import static com.example.addressadmin.ApiModels.*;

@Service
class UserService {
    private final Map<Long, User> users = new LinkedHashMap<>();
    private final AtomicLong nextAddressId = new AtomicLong(106);

    UserService() {
        users.put(1L, new User(1, "maya.chen@example.com", "Maya", "Chen", List.of(
                new User.Address(101, "Home", "18 Garden Street", "Apartment 4B",
                        "Portland", "Oregon", "97205", "United States"),
                new User.Address(102, "Office", "500 Market Avenue", null,
                        "Portland", "Oregon", "97204", "United States"))));
        users.put(2L, new User(2, "liam.patel@example.com", "Liam", "Patel", List.of(
                new User.Address(103, "Home", "42 Willow Lane", null,
                        "Austin", "Texas", "78701", "United States"))));
        users.put(3L, new User(3, "sofia.martin@example.com", "Sofia", "Martin", List.of(
                new User.Address(104, "Primary", "7 Rue des Fleurs", "2e étage",
                        "Lyon", "Auvergne-Rhône-Alpes", "69002", "France"),
                new User.Address(105, "Family", "29 Avenue Victor Hugo", null,
                        "Nice", "Provence-Alpes-Côte d'Azur", "06000", "France"))));
        users.put(4L, new User(4, "noah.williams@example.com", "Noah", "Williams", List.of()));
    }

    synchronized List<UserSummary> findAll() {
        return users.values().stream().map(this::toSummary).toList();
    }

    synchronized UserDetail find(long id) {
        return toDetail(requireUser(id));
    }

    synchronized UserDetail updateProfile(long id, ProfileRequest request) {
        var user = requireUser(id);
        user.updateProfile(cleanEmail(request.email()), clean(request.firstName()), clean(request.lastName()));
        return toDetail(user);
    }

    synchronized AddressResponse addAddress(long userId, AddressRequest request) {
        var user = requireUser(userId);
        var address = new User.Address(nextAddressId.getAndIncrement(),
                clean(request.label()), clean(request.line1()), cleanNullable(request.line2()),
                clean(request.city()), clean(request.state()), clean(request.postalCode()),
                clean(request.country()));
        user.addresses().add(address);
        return toAddress(address);
    }

    synchronized AddressResponse updateAddress(long userId, long addressId, AddressRequest request) {
        var address = requireAddress(requireUser(userId), addressId);
        address.update(clean(request.label()), clean(request.line1()), cleanNullable(request.line2()),
                clean(request.city()), clean(request.state()), clean(request.postalCode()),
                clean(request.country()));
        return toAddress(address);
    }

    synchronized void deleteAddress(long userId, long addressId) {
        var user = requireUser(userId);
        var address = requireAddress(user, addressId);
        user.addresses().remove(address);
    }

    private User requireUser(long id) {
        var user = users.get(id);
        if (user == null) {
            throw new ResourceNotFoundException("User " + id + " was not found");
        }
        return user;
    }

    private User.Address requireAddress(User user, long addressId) {
        return user.addresses().stream()
                .filter(address -> address.id() == addressId)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Address " + addressId + " was not found for user " + user.id()));
    }

    private UserSummary toSummary(User user) {
        return new UserSummary(user.id(), user.email(), user.firstName(), user.lastName(),
                user.addresses().size());
    }

    private UserDetail toDetail(User user) {
        return new UserDetail(user.id(), user.email(), user.firstName(), user.lastName(),
                user.addresses().stream().map(this::toAddress).toList());
    }

    private AddressResponse toAddress(User.Address address) {
        return new AddressResponse(address.id(), address.label(), address.line1(), address.line2(),
                address.city(), address.state(), address.postalCode(), address.country());
    }

    private String clean(String value) {
        return value.trim();
    }

    private String cleanEmail(String value) {
        return clean(value).toLowerCase();
    }

    private String cleanNullable(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
