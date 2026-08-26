package com.example.useraddressmanagement.service;

import com.example.useraddressmanagement.dto.UserRequest;
import com.example.useraddressmanagement.dto.UserResponse;
import com.example.useraddressmanagement.dto.UserSummaryResponse;
import com.example.useraddressmanagement.entity.User;
import com.example.useraddressmanagement.exception.DuplicateEmailException;
import com.example.useraddressmanagement.exception.ResourceNotFoundException;
import com.example.useraddressmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<UserSummaryResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserSummaryResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public UserResponse getUser(Long id) {
        return UserResponse.from(findUserOrThrow(id));
    }

    public UserResponse createUser(UserRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateEmailException(request.email());
        }
        User user = User.builder()
                .email(request.email())
                .firstName(request.firstName())
                .lastName(request.lastName())
                .build();
        return UserResponse.from(userRepository.save(user));
    }

    public UserResponse updateUser(Long id, UserRequest request) {
        User user = findUserOrThrow(id);
        if (userRepository.existsByEmailIgnoreCaseAndIdNot(request.email(), id)) {
            throw new DuplicateEmailException(request.email());
        }
        user.setEmail(request.email());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        return UserResponse.from(user);
    }

    public void deleteUser(Long id) {
        User user = findUserOrThrow(id);
        userRepository.delete(user);
    }

    User findUserOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }
}
