package com.christiantoledana.api.user;

import com.christiantoledana.api.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserModel> findAll() {
        return userRepository.findAll();
    }

    public UserModel findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }

    public UserModel create(UserModel user) {
        user.setId(null);
        return userRepository.save(user);
    }

    public UserModel update(Long id, UserModel updates) {
        UserModel existing = findById(id);
        if (updates.getEmail() != null) {
            existing.setEmail(updates.getEmail());
        }
        if (updates.getFirstName() != null) {
            existing.setFirstName(updates.getFirstName());
        }
        if (updates.getLastName() != null) {
            existing.setLastName(updates.getLastName());
        }
        return userRepository.save(existing);
    }

    public void delete(Long id) {
        findById(id);
        userRepository.deleteById(id);
    }
}
