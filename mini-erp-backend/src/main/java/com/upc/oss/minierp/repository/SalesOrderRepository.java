package com.upc.oss.minierp.repository;

import com.upc.oss.minierp.dto.response.MonthlySalesDto;
import com.upc.oss.minierp.entity.SalesOrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SalesOrderRepository extends JpaRepository<SalesOrderEntity, Long> {

    Page<SalesOrderEntity> findByCustomerNameContainingIgnoreCaseOrUserUsernameContainingIgnoreCase(
            String customerName,
            String username,
            Pageable pageable
    );

    @Query("""
                SELECT new com.upc.oss.minierp.dto.response.MonthlySalesDto(
                    MONTH(o.date),
                    SUM(o.total)
                )
                FROM SalesOrderEntity o
                WHERE o.status = 'FACTURADO'
                  AND YEAR(o.date) = YEAR(CURRENT_DATE)
                GROUP BY MONTH(o.date)
                ORDER BY MONTH(o.date)
            """)
    List<MonthlySalesDto> getMonthlySales();

    // Validar
    @Query(value = """
                SELECT COALESCE(SUM(o.total), 0)
                FROM salesorder o
                WHERE o.status = 'FACTURADO'
                  AND o.date::date = CURRENT_DATE
            """, nativeQuery = true)
    BigDecimal getTotalToday();


    @Query(value = """
                SELECT COALESCE(SUM(o.total), 0)
                FROM salesorder o
                WHERE o.status = 'FACTURADO'
                  AND o.date BETWEEN DATE_TRUNC('week', CURRENT_DATE)
                                  AND DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '7 days'
            """, nativeQuery = true)
    BigDecimal getTotalThisWeek();

    @Query("""
                SELECT COALESCE(SUM(o.total), 0)
                FROM SalesOrderEntity o
                WHERE o.status = 'FACTURADO'
                  AND MONTH(o.date) = MONTH(CURRENT_DATE)
                  AND YEAR(o.date) = YEAR(CURRENT_DATE)
            """)
    BigDecimal getTotalThisMonth();

    @Query(value = """
            SELECT COUNT(*)
            FROM salesorder o
            WHERE o.status = 'FACTURADO'
              AND o.date::date = CURRENT_DATE
            """, nativeQuery = true)
    Long getOrdersToday();

    @Query(value = """
                SELECT COUNT(*)
                FROM salesorder o
                WHERE o.status = 'FACTURADO'
                  AND o.date >= DATE_TRUNC('week', CURRENT_DATE)
            """, nativeQuery = true)
    Long getOrdersThisWeek();

    @Query("""
                SELECT COUNT(o)
                FROM SalesOrderEntity o
                WHERE o.status = 'FACTURADO'
                  AND MONTH(o.date) = MONTH(CURRENT_DATE)
                  AND YEAR(o.date) = YEAR(CURRENT_DATE)
            """)
    Long getOrdersThisMonth();

}
