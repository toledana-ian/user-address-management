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
        UserModel maryGrace = new UserModel(null, "mary.grace.piattos@example.com", "Mary Grace", "Piattos");
        maryGrace.setAddresses(List.of(
                new AddressModel(1L, "Home", "12 Sampaguita St", "Quezon City", "NCR", "1100", "Philippines", true),
                new AddressModel(2L, "Work", "8 Ayala Ave", "Makati", "NCR", "1226", "Philippines", false)
        ));
        userRepository.save(maryGrace);

        UserModel pia = new UserModel(null, "pia.piattos-lim@example.com", "Pia", "Piattos-Lim");
        pia.setAddresses(List.of(
                new AddressModel(3L, "Home", "45 Kamias Rd", "Quezon City", "NCR", "1102", "Philippines", true)
        ));
        userRepository.save(pia);

        UserModel jay = new UserModel(null, "jay.kamote@example.com", "Jay", "Kamote");
        jay.setAddresses(List.of(
                new AddressModel(4L, "Home", "77 Malakas St", "Diliman", "NCR", "1101", "Philippines", true),
                new AddressModel(5L, "Provincial", "3 Rizal St", "San Fernando", "Pampanga", "2000", "Philippines", false)
        ));
        userRepository.save(jay);

        UserModel miggy = new UserModel(null, "miggy.mango@example.com", "Miggy", "Mango");
        miggy.setAddresses(List.of(
                new AddressModel(6L, "Home", "21 Guava St", "Cebu City", "Cebu", "6000", "Philippines", true)
        ));
        userRepository.save(miggy);

        UserModel antonio = new UserModel(null, "antonio.pagong@example.com", "Antonio", "Pagong");
        antonio.setAddresses(List.of(
                new AddressModel(7L, "Home", "9 Turtle Ln", "Davao City", "Davao del Sur", "8000", "Philippines", true)
        ));
        userRepository.save(antonio);

        UserModel timon = new UserModel(null, "timon.andrew.pusa@example.com", "Timon Andrew", "Pusa");
        timon.setAddresses(List.of(
                new AddressModel(8L, "Home", "14 Whiskers Ave", "Pasig", "NCR", "1600", "Philippines", true),
                new AddressModel(9L, "Work", "100 Ortigas Ave", "Pasig", "NCR", "1605", "Philippines", false)
        ));
        userRepository.save(timon);

        UserModel don = new UserModel(null, "don.piang@example.com", "Don", "Piang");
        don.setAddresses(List.of(
                new AddressModel(10L, "Home", "5 Manggahan St", "Taguig", "NCR", "1630", "Philippines", true)
        ));
        userRepository.save(don);
    }
}
