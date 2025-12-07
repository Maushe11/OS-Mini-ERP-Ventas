package com.upc.oss.minierp.repository;

import com.upc.oss.minierp.entity.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<InvoiceEntity, Long> {

    @Query("SELECT MAX(i.number) FROM InvoiceEntity i WHERE i.type = :type")
    String findLastNumberByType(String type);

}
