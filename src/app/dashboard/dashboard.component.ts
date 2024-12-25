import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private http = inject(HttpClient);
  data: any;

  constructor() {
    this.http.get('https://api.asgardeo.io/t/mifrazmurthaja/scim2/Me')
      .subscribe(response => this.data = response);
  }
}
