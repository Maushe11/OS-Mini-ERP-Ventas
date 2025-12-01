package com.upc.oss.minierp.repository;

import com.upc.oss.minierp.entity.CustomerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {

    boolean existsByDocument(String document);

    Page<CustomerEntity> findByNameContainingIgnoreCaseOrDocumentContainingIgnoreCase(
            String name,
            String document,
            Pageable pageable
    );
}
