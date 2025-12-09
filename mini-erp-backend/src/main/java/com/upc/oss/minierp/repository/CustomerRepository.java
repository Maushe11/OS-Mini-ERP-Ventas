package com.upc.oss.minierp.repository;

import com.upc.oss.minierp.dto.response.TopCustomerDto;
import com.upc.oss.minierp.entity.CustomerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {

    boolean existsByDocument(String document);

    Page<CustomerEntity> findByNameContainingIgnoreCaseOrDocumentContainingIgnoreCase(
            String name,
            String document,
            Pageable pageable
    );

    @Query("""
                SELECT new com.upc.oss.minierp.dto.response.TopCustomerDto(
                    c.id,
                    c.name,
                    SUM(o.total),
                    COUNT(o)
                )
                FROM SalesOrderEntity o
                JOIN o.customer c
                WHERE o.status = 'FACTURADO'
                GROUP BY c.id, c.name
                ORDER BY SUM(o.total) DESC
            """)
    List<TopCustomerDto> getTopCustomers();

}
