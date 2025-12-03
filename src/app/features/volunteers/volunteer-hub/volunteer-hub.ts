import { Component, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

interface Volunteer {
  user__email: string;
  skills: string[];
  availability: string;
  hours_contributed: number;
}

@Component({
  selector: 'app-volunteer-hub',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './volunteer-hub.html',
  styleUrls: ['./volunteer-hub.scss']
})
export class VolunteerHubComponent {
  private api = inject(ApiService);
  volunteers: Volunteer[] = [];

  ngOnInit() {
    this.api.get<Volunteer[]>('volunteers/').subscribe(volunteers => {
      this.volunteers = volunteers;
    });
  }
}