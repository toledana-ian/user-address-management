package com.example.useraddressmanagement.config;

import com.example.useraddressmanagement.entity.Address;
import com.example.useraddressmanagement.entity.User;
import com.example.useraddressmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Transactional
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        User jane = User.builder()
                .email("jane.doe@example.com")
                .firstName("Jane")
                .lastName("Doe")
                .build();
        jane.addAddress(Address.builder()
                .label("Home")
                .street("123 Main St")
                .city("Springfield")
                .state("IL")
                .postalCode("62704")
                .country("USA")
                .primary(true)
                .build());
        jane.addAddress(Address.builder()
                .label("Work")
                .street("500 Market St")
                .city("Springfield")
                .state("IL")
                .postalCode("62701")
                .country("USA")
                .primary(false)
                .build());
        userRepository.save(jane);

        User john = User.builder()
                .email("john.smith@example.com")
                .firstName("John")
                .lastName("Smith")
                .build();
        john.addAddress(Address.builder()
                .label("Home")
                .street("77 Ocean Ave")
                .city("Santa Monica")
                .state("CA")
                .postalCode("90401")
                .country("USA")
                .primary(true)
                .build());
        userRepository.save(john);

        User admin = User.builder()
                .email("admin@example.com")
                .firstName("Ada")
                .lastName("Min")
                .build();
        userRepository.save(admin);
    }
}
