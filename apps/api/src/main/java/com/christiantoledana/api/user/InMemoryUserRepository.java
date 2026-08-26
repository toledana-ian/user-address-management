package com.christiantoledana.api.user;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

import com.christiantoledana.api.user.model.Address;
import com.christiantoledana.api.user.model.User;

@Repository
public class InMemoryUserRepository {

    private final Map<Long, User> users = new ConcurrentHashMap<>();
    private final AtomicLong userIdSequence = new AtomicLong();
    private final AtomicLong addressIdSequence = new AtomicLong();

    public InMemoryUserRepository() {
        seed();
    }

    public List<User> findAll() {
        return List.copyOf(users.values());
    }

    public Optional<User> findById(Long id) {
        return Optional.ofNullable(users.get(id));
    }

    public User save(User user) {
        if (user.getId() == null) {
            user.setId(userIdSequence.incrementAndGet());
        }
        users.put(user.getId(), user);
        return user;
    }

    public long nextAddressId() {
        return addressIdSequence.incrementAndGet();
    }

    private void seed() {
        User alice = new User(userIdSequence.incrementAndGet(), "alice@example.com", "Alice", "Johnson");
        alice.getAddresses().add(new Address(addressIdSequence.incrementAndGet(), "Home", "123 Maple St",
                "Springfield", "IL", "62701", "USA", true));
        alice.getAddresses().add(new Address(addressIdSequence.incrementAndGet(), "Work", "1 Corporate Blvd",
                "Springfield", "IL", "62702", "USA", false));
        users.put(alice.getId(), alice);

        User bob = new User(userIdSequence.incrementAndGet(), "bob@example.com", "Bob", "Smith");
        bob.getAddresses().add(new Address(addressIdSequence.incrementAndGet(), "Home", "456 Oak Ave",
                "Metropolis", "NY", "10001", "USA", true));
        users.put(bob.getId(), bob);

        User carol = new User(userIdSequence.incrementAndGet(), "carol@example.com", "Carol", "Davis");
        users.put(carol.getId(), carol);
    }
}
