package com.example.addressadmin;

import java.util.ArrayList;
import java.util.List;

final class User {
    private final long id;
    private String email;
    private String firstName;
    private String lastName;
    private final List<Address> addresses;

    User(long id, String email, String firstName, String lastName, List<Address> addresses) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.addresses = new ArrayList<>(addresses);
    }

    long id() { return id; }
    String email() { return email; }
    String firstName() { return firstName; }
    String lastName() { return lastName; }
    List<Address> addresses() { return addresses; }

    void updateProfile(String email, String firstName, String lastName) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    static final class Address {
        private final long id;
        private String label;
        private String line1;
        private String line2;
        private String city;
        private String state;
        private String postalCode;
        private String country;

        Address(long id, String label, String line1, String line2, String city,
                String state, String postalCode, String country) {
            this.id = id;
            update(label, line1, line2, city, state, postalCode, country);
        }

        long id() { return id; }
        String label() { return label; }
        String line1() { return line1; }
        String line2() { return line2; }
        String city() { return city; }
        String state() { return state; }
        String postalCode() { return postalCode; }
        String country() { return country; }

        void update(String label, String line1, String line2, String city,
                    String state, String postalCode, String country) {
            this.label = label;
            this.line1 = line1;
            this.line2 = line2;
            this.city = city;
            this.state = state;
            this.postalCode = postalCode;
            this.country = country;
        }
    }
}
