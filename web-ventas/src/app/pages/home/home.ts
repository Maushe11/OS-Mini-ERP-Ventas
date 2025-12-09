import {Component, computed, effect, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

import {AuthService} from '../../core/services/auth-service';
import {DashboardService} from '../../core/services/dashboard.service';
import {ChartModule} from 'primeng/chart';
import {TableModule} from 'primeng/table';
import {toSignal} from '@angular/core/rxjs-interop';
import {Divider} from 'primeng/divider';
import {StyleClass} from 'primeng/styleclass';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, ChartModule, TableModule, Divider, StyleClass],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

  private auth = inject(AuthService);
  private router = inject(Router);
  private dashboard = inject(DashboardService);

  token = computed(() => this.auth.getToken());

  summary = toSignal(this.dashboard.getSummary(), {
    initialValue: {
      totalToday: 0,
      totalWeek: 0,
      totalMonth: 0,
    },
  });

  monthlySales = toSignal(this.dashboard.getMonthlySales(), {
    initialValue: [],
  });

  productRanking = toSignal(this.dashboard.getProductRanking(), {
    initialValue: [],
  });

  topCustomers = toSignal(this.dashboard.getTopCustomers(), {
    initialValue: [],
  });

  // ===== KPIs (computed) =====
  totalToday = computed(() => this.summary().totalToday);
  totalWeek = computed(() => this.summary().totalWeek);
  totalMonth = computed(() => this.summary().totalMonth);

  // ===== Chart (computed) =====
  salesChartData = computed(() => {
    const data = this.monthlySales();

    return {
      labels: data.map(m => this.monthName(m.month)),
      datasets: [
        {
          label: 'Ventas mensuales',
          backgroundColor: [
            'rgba(249, 115, 22, 0.2)',
            'rgba(6, 182, 212, 0.2)',
            'rgb(107, 114, 128, 0.2)',
            'rgba(139, 92, 246, 0.2)',
          ],
          borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
          borderWidth: 1,
          data: data.map(m => m.total),
        },
      ],
    };
  });

  salesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // ===== Gráfico productos =====
  productChartData = computed(() => {
    const ranking = this.productRanking();

    return {
      labels: ranking.map(r => r.productName),
      datasets: [
        {
          label: 'Cantidad vendida',
          data: ranking.map(r => r.totalQuantitySold),

          backgroundColor: [
            'rgba(249, 115, 22, 0.7)',   // naranja
            'rgba(6, 182, 212, 0.7)',    // celeste
            'rgba(107, 114, 128, 0.7)',  // gris
            'rgba(139, 92, 246, 0.7)',   // morado
            'rgba(236, 72, 153, 0.7)',   // rosado
            'rgba(34, 197, 94, 0.7)',    // verde
          ],

          hoverBackgroundColor: [
            'rgb(249, 115, 22)',
            'rgb(6, 182, 212)',
            'rgb(107, 114, 128)',
            'rgb(139, 92, 246)',
            'rgb(236, 72, 153)',
            'rgb(34, 197, 94)',
          ],

          borderWidth: 1,
        }
      ]
    };
  });

  // ===== Gráfico clientes =====
  customerChartData = computed(() => {
    const customers = this.topCustomers();

    return {
      labels: customers.map(c => c.customerName),
      datasets: [
        {
          label: 'Total comprado',
          backgroundColor: [
            'rgba(249, 115, 22, 0.2)',
            'rgba(6, 182, 212, 0.2)',
            'rgb(107, 114, 128, 0.2)',
            'rgba(139, 92, 246, 0.2)',
          ],
          borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
          borderWidth: 1,
          data: customers.map(c => c.totalPurchased),
        }
      ]
    };
  });

  productChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  customerChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {
    // efecto opcional solo para depuración
    effect(() => {
      console.log('Summary actualizado:', this.summary());
    });
  }

  monthName(month: number) {
    const names = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return names[month - 1];
  }
}
