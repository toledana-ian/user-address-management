package com.christiantoledana.api.address;

import com.christiantoledana.api.common.exception.ResourceNotFoundException;
import com.christiantoledana.api.user.UserModel;
import com.christiantoledana.api.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class AddressService {

    private final UserService userService;
    private final AtomicLong idSequence = new AtomicLong(100);

    public AddressService(UserService userService) {
        this.userService = userService;
    }

    private AddressModel findAddress(UserModel user, Long addressId) {
        return user.getAddresses().stream()
                .filter(address -> address.getId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Address not found with id " + addressId + " for user " + user.getId()));
    }

    public List<AddressModel> findAllForUser(Long userId) {
        return userService.findById(userId).getAddresses();
    }

    public AddressModel create(Long userId, AddressModel address) {
        UserModel user = userService.findById(userId);
        address.setId(idSequence.incrementAndGet());
        address.setPrimary(user.getAddresses().isEmpty());
        user.getAddresses().add(address);
        return address;
    }

    public AddressModel update(Long userId, Long addressId, AddressModel updates) {
        UserModel user = userService.findById(userId);
        AddressModel existing = findAddress(user, addressId);

        if (updates.getLabel() != null) {
            existing.setLabel(updates.getLabel());
        }
        if (updates.getStreet() != null) {
            existing.setStreet(updates.getStreet());
        }
        if (updates.getCity() != null) {
            existing.setCity(updates.getCity());
        }
        if (updates.getState() != null) {
            existing.setState(updates.getState());
        }
        if (updates.getPostalCode() != null) {
            existing.setPostalCode(updates.getPostalCode());
        }
        if (updates.getCountry() != null) {
            existing.setCountry(updates.getCountry());
        }
        return existing;
    }

    public void delete(Long userId, Long addressId) {
        UserModel user = userService.findById(userId);
        AddressModel target = findAddress(user, addressId);
        user.getAddresses().remove(target);

        if (target.isPrimary() && !user.getAddresses().isEmpty()) {
            user.getAddresses().get(0).setPrimary(true);
        }
    }

    public AddressModel setPrimary(Long userId, Long addressId) {
        UserModel user = userService.findById(userId);
        AddressModel target = findAddress(user, addressId);
        user.getAddresses().forEach(address -> address.setPrimary(address.getId().equals(addressId)));
        return target;
    }
}
