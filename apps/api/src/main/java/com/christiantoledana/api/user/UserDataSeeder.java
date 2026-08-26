package com.christiantoledana.api.user;

import com.christiantoledana.api.address.AddressModel;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserDataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public UserDataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        UserModel alice = new UserModel(null, "alice@example.com", "Alice", "Nguyen");
        alice.setAddresses(List.of(
                new AddressModel(1L, "Home", "123 Main St", "Springfield", "IL", "62704", "USA", true),
                new AddressModel(2L, "Work", "456 Market St", "Springfield", "IL", "62701", "USA", false)
        ));
        userRepository.save(alice);

        UserModel bob = new UserModel(null, "bob@example.com", "Bob", "Santos");
        bob.setAddresses(List.of(
                new AddressModel(3L, "Home", "789 Elm St", "Metropolis", "NY", "10001", "USA", true)
        ));
        userRepository.save(bob);

        UserModel carol = new UserModel(null, "carol@example.com", "Carol", "Reyes");
        userRepository.save(carol);
    }
}
