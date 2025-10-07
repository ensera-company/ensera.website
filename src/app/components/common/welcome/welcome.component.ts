// welcome-section.component.ts
import { Component, Input, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

type Feature = {
  icon: string;          // FA class: "far fa-edit"
  title: string;
  text: string;
  cta?: { text: string; sectionId?: string };
};

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  @Input() headingSmall = 'Built for the agentic era';
  @Input() headingLargePrefix = 'Welcome to';
  @Input() brandName = 'Ensear';
  @Input() intro =
    'We build secure, cloud-native, multi-agent systems that turn data into decisions—fast, reliable, and at scale.';

  features = signal<Feature[]>([
    {
      icon: 'fa-solid fa-brain',
      title: 'Intelligent by Design',
      text:
        'Agentic workflows that learn, adapt, and collaborate—delivering measurable outcomes, not just dashboards.',
      cta: { text: 'Explore capabilities', sectionId: 'about' },
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Secure to the Core',
      text:
        'Security and privacy baked in: Zero-trust patterns, Secure SDLC, and DevSecOps to meet enterprise compliance.',
      cta: { text: 'See our standards', sectionId: 'about' },
    },
    {
      icon: 'fa-solid fa-gears',
      title: 'Future-Ready Architecture',
      text:
        'Cloud-native, modular foundations with observability and CI/CD—ready for rapid change and seamless integration.',
      cta: { text: 'View architecture', sectionId: 'about' },
    },
  ]);

  // smooth-scroll or your existing click handler
  onLink(sectionId?: string) {
    if (!sectionId) return;
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // simple parallax on scroll (disabled for reduced motion)
  private motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  constructor() {
    if (this.motionOk) {
      effect(() => {
        const onScroll = () => {
          document.querySelectorAll<HTMLElement>('[data-speed]').forEach(el => {
            const sp = Number(el.dataset.speed ?? 0);
            el.style.transform = `translate3d(0, ${window.scrollY * sp}px, 0)`;
          });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
      });
    }
  }
}
