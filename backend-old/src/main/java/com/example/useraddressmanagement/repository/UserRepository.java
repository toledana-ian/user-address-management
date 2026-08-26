package com.example.useraddressmanagement.repository;

import com.example.useraddressmanagement.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

    @EntityGraph(attributePaths = "addresses")
    @Override
    List<User> findAll();

    @EntityGraph(attributePaths = "addresses")
    @Override
    Optional<User> findById(Long id);
}
