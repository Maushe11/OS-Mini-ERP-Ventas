package com.upc.oss.minierp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "salesorder")
public class SalesOrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOrder;

    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id")
    private CustomerEntity customer;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private LocalDateTime date = LocalDateTime.now();

    private BigDecimal total = BigDecimal.ZERO;

    private String status = "REGISTRADO"; // registrado, facturado

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SalesOrderDetailEntity> details = new LinkedHashSet<>();

}
