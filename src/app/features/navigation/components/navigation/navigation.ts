import { Component, inject } from '@angular/core';
import { NavigationService } from '../../service/navigation.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'navigation',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  navigation = inject(NavigationService);
  router = inject(Router);

  pages = this.navigation.pages;

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
