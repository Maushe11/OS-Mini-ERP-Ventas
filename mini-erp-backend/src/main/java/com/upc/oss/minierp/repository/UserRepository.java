package com.upc.oss.minierp.repository;

import com.upc.oss.minierp.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsername(String username);

    Page<UserEntity> findByUsernameContainingIgnoreCase(
            String username,
            Pageable pageable
    );
}
