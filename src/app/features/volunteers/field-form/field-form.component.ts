import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-field-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.scss']
})
export class FieldFormComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  form = this.fb.group({
    location: [''],
    beneficiaries: [0],
    activity: ['health'],
    requiresInternet: [false]
  });

  saveForm() {
    const data = this.form.value;
    if (data.requiresInternet) {
      this.api.post('field-forms/', data).subscribe();
    } else {
      const offlineForms = JSON.parse(localStorage.getItem('offlineForms') || '[]');
      offlineForms.push({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem('offlineForms', JSON.stringify(offlineForms));
      alert('Saved for offline sync!');
    }
  }
}