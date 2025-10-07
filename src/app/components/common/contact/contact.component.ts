import {
  Component, Input, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder, Validators
} from '@angular/forms';

type ContactInfo = {
  location: string;      // full address line
  email: string;
  phone?: string;
  fax?: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  /* Headings / intro (edit or bind from parent) */
  @Input() eyebrow = 'Get in Touch';
  @Input() titlePrefix = "Let's";
  @Input() titleStrong = 'Contact';
  @Input() titleSuffix = 'Us';
  @Input() intro =
    'Let\'s shape a smarter, more secure future together - built on innovation, intelligence, and trust.';

  /* Right-side info (fill with your real details) */
  @Input() info: ContactInfo = {
    location: 'Amman, Jordan',
    email: 'info@ensera.ai',
    phone: '+962 7 9900 7901',
    fax: ''
  };

  /** Endpoint to POST messages (adjust to your API/Email service) */
  @Input() submitUrl = '/api/contact';

  submitting = signal(false);
  sent = signal<null | 'success' | 'error'>(null);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    number: ['',
      [
        Validators.pattern(/^[+()\-.\s0-9]{7,20}$/) // lenient; format on server
      ]
    ],
    message: ['', [Validators.required, Validators.minLength(10)]],

    // Honeypot (should stay empty)
    company: ['']
  });

  constructor(private fb: FormBuilder,
              // private http: HttpClient
  ) {}

  get f() { return this.form.controls; }

  mailto() { return `mailto:${this.info.email}`; }
  tel()    { return this.info.phone ? `tel:${this.info.phone.replace(/[^\d+]/g, '')}` : null; }
  fax()    { return this.info.fax ? `tel:${this.info.fax.replace(/[^\d+]/g, '')}` : null; }

  onSubmit() {
    this.sent.set(null);
    if (this.form.value.company) {  // bot filled the honeypot
      this.sent.set('success');     // silently ignore spam as "ok"
      this.form.reset();
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);

    // this.http.post(this.submitUrl, {
    //   name: this.f.name.value,
    //   email: this.f.email.value,
    //   subject: this.f.subject.value,
    //   phone: this.f.number.value,
    //   message: this.f.message.value,
    //   source: 'website'
    // })
    //   .pipe(finalize(() => this.submitting.set(false)))
    //   .subscribe({
    //     next: () => { this.sent.set('success'); this.form.reset(); },
    //     error: () => { this.sent.set('error'); }
    //   });
  }
}
