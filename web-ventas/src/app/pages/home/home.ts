import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth-service';
import {
  DashboardService,
  DashboardSummary,
  MonthlySales
} from '../../services/dashboard.service';

import { ChartModule } from 'primeng/chart';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, ChartModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  // ====== Autenticación (lo que ya tenías) ======
  private authService = inject(AuthService);
  private router = inject(Router);

  token = computed(() => this.authService.getToken());

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // ====== Dashboard (nuevo) ======
  private dashboardService = inject(DashboardService);

  // KPIs
  totalSales = 0;
  totalCustomers = 0;
  totalProducts = 0;

  // Gráfico
  salesChartData: any;
  salesChartOptions: any;

  // Estado de carga
  loading = false;

  // Se ejecuta al entrar a Home
  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    this.loading = true;

    this.dashboardService.getSummary().subscribe({
      next: (summary: DashboardSummary) => {
        // Asignar KPI
        this.totalSales = summary.totalSales;
        this.totalCustomers = summary.totalCustomers;
        this.totalProducts = summary.totalProducts;

        // Construir gráfico
        this.buildSalesChart(summary.monthlySales);

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el dashboard', err);
        this.loading = false;
      },
    });
  }

  private buildSalesChart(monthly: MonthlySales[]): void {
    const labels = monthly.map((m) => `Mes ${m.month}`);
    const data = monthly.map((m) => m.total);

    this.salesChartData = {
      labels,
      datasets: [
        {
          label: 'Ventas mensuales',
          data,
        },
      ],
    };

    this.salesChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };
  }
}
