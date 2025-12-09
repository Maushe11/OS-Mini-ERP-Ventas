package com.upc.oss.minierp.repository;

import com.upc.oss.minierp.dto.response.ProductRankingDto;
import com.upc.oss.minierp.entity.SalesOrderDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SalesOrderDetailRepository extends JpaRepository<SalesOrderDetailEntity, Long> {

    @Query("""
                SELECT new com.upc.oss.minierp.dto.response.ProductRankingDto(
                    d.product.id,
                    d.product.name,
                    SUM(d.quantity),
                    SUM(d.subtotal)
                )
                FROM SalesOrderDetailEntity d
                JOIN d.order o
                WHERE o.status = 'FACTURADO'
                GROUP BY d.product.id, d.product.name
                ORDER BY SUM(d.quantity) DESC
            """)
    List<ProductRankingDto> getProductRanking();


}
