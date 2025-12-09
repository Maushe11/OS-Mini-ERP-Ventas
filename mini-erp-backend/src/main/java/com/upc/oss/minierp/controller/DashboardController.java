package com.upc.oss.minierp.controller;

import com.upc.oss.minierp.dto.response.DashboardSummaryDto;
import com.upc.oss.minierp.dto.response.MonthlySalesDto;
import com.upc.oss.minierp.dto.response.ProductRankingDto;
import com.upc.oss.minierp.dto.response.TopCustomerDto;
import com.upc.oss.minierp.service.IDashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final IDashboardService dashboardService;
    
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/summary")
    @Operation(
            summary = "Obtener resumen general",
            description = """
                    Devuelve los valores agregados del sistema, incluyendo:
                    - Total vendido hoy
                    - Total vendido en la semana actual
                    - Total vendido en el mes actual
                    - Cantidad de órdenes emitidas por día, semana y mes
                    
                    Útil para paneles de control y análisis rápidos de actividad comercial.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Resumen obtenido correctamente"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<DashboardSummaryDto> getSummary() {
        return ResponseEntity.ok(dashboardService.getSummary());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/product-ranking")
    @Operation(
            summary = "Obtener ranking de productos",
            description = """
                    Retorna una lista ordenada de productos según:
                    - Cantidad total vendida
                    - Ingresos generados por cada producto
                    
                    Permite identificar productos más vendidos o de mayor impacto comercial.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ranking obtenido correctamente"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<List<ProductRankingDto>> getProductRanking() {
        return ResponseEntity.ok(dashboardService.getProductRanking());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/top-customers")
    @Operation(
            summary = "Obtener clientes con mayor volumen de compras",
            description = """
                    Devuelve una lista jerarquizada de los clientes que más han comprado,
                    incluyendo:
                    - Monto total adquirido
                    - Número de órdenes emitidas por cliente
                    
                    Fundamental para análisis de clientes frecuentes y segmentación comercial.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado obtenido correctamente"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<List<TopCustomerDto>> getTopCustomers() {
        return ResponseEntity.ok(dashboardService.getTopCustomers());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/monthly-sales")
    @Operation(
            summary = "Obtener ventas agrupadas por mes",
            description = """
                    Genera información consolidada de ventas por mes del año actual.
                    Cada elemento contiene:
                    - Número del mes (1-12)
                    - Monto total facturado en dicho mes
                    
                    Usado para análisis de tendencias y variaciones en el flujo de ventas.
                    """
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ventas mensuales obtenidas correctamente"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<List<MonthlySalesDto>> getMonthlySales() {
        return ResponseEntity.ok(dashboardService.getMonthlySales());
    }

}
