// src/app/features/admin/admin-layout/admin-layout.ts
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayout {
  private isDarkSignal = signal(false);
  protected isDark = this.isDarkSignal.asReadonly();

  // ✅ ADD THIS METHOD
  toggleSidebar() {
    // For mobile sidebar toggle (optional)
    // In desktop, sidebar is always visible
    console.log('Sidebar toggle clicked');
  }

  toggleDarkMode() {
    const newMode = !this.isDarkSignal();
    this.isDarkSignal.set(newMode);
    
    if (newMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
    
    localStorage.setItem('darkMode', String(newMode));
  }

  ngOnInit() {
    const saved = localStorage.getItem('darkMode') === 'true';
    if (saved) {
      document.body.setAttribute('data-theme', 'dark');
      this.isDarkSignal.set(true);
    }
  }
}