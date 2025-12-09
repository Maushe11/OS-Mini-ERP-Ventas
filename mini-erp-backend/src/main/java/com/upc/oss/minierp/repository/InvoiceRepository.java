package com.upc.oss.minierp.repository;

import com.upc.oss.minierp.entity.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long> {

    @Query("SELECT MAX(i.number) FROM InvoiceEntity i WHERE i.type = :type")
    String findLastNumberByType(String type);

    @Query("SELECT COALESCE(SUM(i.total), 0) FROM InvoiceEntity i")
    BigDecimal getTotalSales();

    @Query("""
            SELECT MONTH(i.date) AS month, SUM(i.total) AS total
            FROM InvoiceEntity i
            GROUP BY MONTH(i.date)
            ORDER BY month
            """)
    List<Object[]> findMonthlySales();

}
