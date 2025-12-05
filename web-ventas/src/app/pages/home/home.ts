import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../core/services/auth-service';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private authService = inject(AuthService);

  private router = inject(Router);

  token = computed(() => this.authService.getToken());

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
