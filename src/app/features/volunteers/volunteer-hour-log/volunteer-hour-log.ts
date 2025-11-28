// volunteer-hour-log.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

interface HourLog {
  id: number;
  email: string;
  hours: string;
  project: string;
  notes: string;
  date: string;
}

@Component({
  selector: 'app-volunteer-hour-log',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './volunteer-hour-log.html',
  styleUrls: ['./volunteer-hour-log.scss']
})
export class VolunteerHourLogComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    hours: [0, [Validators.required, Validators.min(0.1)]],
    project: ['', Validators.required],
    notes: ['']
  });

  logs: HourLog[] = [];
  message = '';
  isLoading = false;

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.api.get<HourLog[]>('hour-logs/').subscribe(logs => {
      this.logs = logs;
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    this.message = '';

    this.api.post('hour-logs/', this.form.value).subscribe({
      next: (log: any) => {
        this.message = `✅ ${log.hours} hours logged for ${log.email}`;
        this.form.reset({
          email: '',
          date: new Date().toISOString().split('T')[0],
          hours: 0,
          project: '',
          notes: ''
        });
        this.loadLogs();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.message = err?.error?.error || 'Failed to log hours';
        this.isLoading = false;
      }
    });
  }
}