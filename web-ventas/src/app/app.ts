import {Component, signal} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Header} from './core/layout/header/header';
import {Sidebar} from './core/layout/sidebar/sidebar';
import {filter} from 'rxjs';
import {Toast} from 'primeng/toast';
import {BreadcrumbComponent} from './core/layout/breadcrumb/breadcrumb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Sidebar, Toast, BreadcrumbComponent],
  templateUrl: 'app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('web-ventas');

  sidebarOpen = false;
  showLayout = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        // rutas donde NO debe mostrarse el layout
        const rutasSinLayout = ['/login', '/auth/login'];

        this.showLayout = !rutasSinLayout.includes(event.urlAfterRedirects);
      });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}
