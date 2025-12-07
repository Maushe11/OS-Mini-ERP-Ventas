package com.upc.oss.minierp.repository;

import com.upc.oss.minierp.entity.SalesOrderDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SalesOrderDetailRepository extends JpaRepository<SalesOrderDetailEntity, Long> {
}
