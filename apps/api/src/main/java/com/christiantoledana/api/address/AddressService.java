package com.christiantoledana.api.address;

import com.christiantoledana.api.common.exception.ResourceNotFoundException;
import com.christiantoledana.api.user.UserModel;
import com.christiantoledana.api.user.UserService;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicLong;

@Service
public class AddressService {

    private final UserService userService;
    private final AtomicLong idSequence = new AtomicLong(100);

    public AddressService(UserService userService) {
        this.userService = userService;
    }

    public AddressModel create(Long userId, AddressModel address) {
        UserModel user = userService.findById(userId);
        address.setId(idSequence.incrementAndGet());
        address.setPrimary(user.getAddresses().isEmpty());
        user.getAddresses().add(address);
        return address;
    }

    public AddressModel setPrimary(Long userId, Long addressId) {
        UserModel user = userService.findById(userId);
        AddressModel target = user.getAddresses().stream()
                .filter(address -> address.getId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Address not found with id " + addressId + " for user " + userId));

        user.getAddresses().forEach(address -> address.setPrimary(address.getId().equals(addressId)));
        return target;
    }
}
