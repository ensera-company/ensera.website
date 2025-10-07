import { Component, Input, signal, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

type ServiceItem = {
  id: string;
  icon: string;          // Font Awesome class
  title: string;
  blurb: string;
  points?: string[];
};

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
})
export class OurServicesComponent implements OnDestroy {
  @Input() heading = 'Our';
  @Input() headingStrong = 'Services';
  @Input() intro =
    'Strategy, design, and engineering — delivered as measurable, maintainable products.';

  // Pre-filled (adjust any text to match your PDF wording)
  services = signal<ServiceItem[]>([
    {
      id: 'microchip',
      icon: 'fas fa-microchip',
      title: 'Agentic AI Solutions',
      blurb: 'Building multi-agent AI ecosystems that think, plan, and collaborate to drive automation intelligence, and business agility.',
      points: ['AI-driven decision making', 'AI-driven automation'],
    },
    {
      id: 'handshake',
      icon: 'fas fa-handshake-angle',
      title: 'Enterprise AI Assistants',
      blurb: 'Developing secure domain-specific assistants that integrate with enterprise systems to deliver contextual insight and workflow automation.',
      points: ['AI-driven automation'],
    },
    {
      id: 'shield',
      icon: 'far fa-shield',
      title: 'Secure SDLC',
      blurb: 'Embedding security-by-design across the development lifecycle to ensure continuous compliance resilience, and trust.',
      points: ['Security architecture', 'Security training'],
    },
    {
      id: 'server',
      icon: 'fas fa-server',
      title: 'Big Data',
      blurb: 'We design scalable data platforms and pipelines that enable real-time insight and AI-driven decision making.',
      points: ['Data modeling', 'Data pipelines', 'Data visualization'],
    },
  ]);

  // (Optional) subtle parallax for the angled accent
  motionOk =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches;
  offset = signal(0);
  raf: number | null = null;
  ticking = false;

  @HostListener('window:scroll')
  onScroll() {
    if (!this.motionOk || this.ticking) return;
    this.ticking = true;
    this.raf = requestAnimationFrame(() => {
      this.offset.set(window.scrollY || 0);
      this.ticking = false;
    });
  }

  ngOnDestroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
  }

  accentTransform(speed = 0.06) {
    if (!this.motionOk) return null;
    return `translate3d(0, ${this.offset() * speed}px, 0)`;
  }
}
