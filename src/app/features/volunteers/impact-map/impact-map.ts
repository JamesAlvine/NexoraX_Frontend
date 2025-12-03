// impact-map.ts
import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const L: any; // Leaflet

@Component({
  selector: 'app-impact-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impact-map.html',
  styleUrls: ['./impact-map.scss']
})
export class ImpactMapComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof L === 'undefined') {
      console.warn('Leaflet not loaded. Add to index.html');
      return;
    }

    const map = L.map('impact-map').setView([-1.2921, 36.8219], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const locations = [
      { lat: -1.2921, lng: 36.8219, name: 'Nairobi', volunteers: 42 },
      { lat: -4.0435, lng: 39.6682, name: 'Mombasa', volunteers: 28 }
    ];

    locations.forEach(loc => {
      L.circleMarker([loc.lat, loc.lng], {
        radius: 8 + (loc.volunteers / 10),
        fillColor: "#4f46e5",
        color: "#3730a3",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`${loc.name}<br>Volunteers: ${loc.volunteers}`).addTo(map);
    });
  }
}