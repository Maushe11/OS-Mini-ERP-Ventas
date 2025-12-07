package com.upc.oss.minierp.repository;

import com.upc.oss.minierp.entity.SalesOrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesOrderRepository extends JpaRepository<SalesOrderEntity, Long> {

    Page<SalesOrderEntity> findByCustomerNameContainingIgnoreCaseOrUserUsernameContainingIgnoreCase(
            String customerName,
            String username,
            Pageable pageable
    );
}
