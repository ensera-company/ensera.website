import {
  Component, Input, signal, computed, HostListener, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger, transition, style, animate
} from '@angular/animations';

type FaqItem = { q: string; a: string };

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  animations: [
    // Smooth height+fade for panel content
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('220ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('180ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnDestroy {
  /** Headings */
  @Input() titlePrefix = 'Frequently Asked';
  @Input() titleStrong = 'Questions';
  @Input() intro = 'Here are quick answers to the things we get asked most.';

  /** Right image */
  @Input() imageUrl = 'images/faq-img.jpg';
  @Input() imageAlt = 'FAQ';

  /** Behavior */
  @Input() singleOpen = false; // if true, keep only one panel open at a time

  /** FAQ items (defaults taken from your snippet; replace with your own whenever) */
  @Input() items: FaqItem[] = [
    {
      q: 'What is this platform about?',
      a: 'Our platform uses advanced AI and cloud technologies to automate, optimize, \n' +
        '          and simplify your workflows — helping your team deliver smarter and faster.'
    },
    {
      q: 'How secure is my data?',
      a: 'We implement full end-to-end encryption, regular security audits, and GDPR-compliant \n' +
        '          practices to ensure your data is protected at every stage.'
    },
    {
      q: 'Do you offer technical support?',
      a: 'Yes! Our support team is available 24/7 via email and chat to help with setup, \n' +
        '          troubleshooting, and guidance for enterprise integration.'
    },
    {
      q: 'Is there a free trial or demo?',
      a: 'Absolutely — you can start with a 14-day free trial to explore all core features \n' +
        '          before upgrading to a full plan.'
    }
  ];

  /** Open state as a Set for multi-open UX */
  private open = signal<Set<number>>(new Set([0])); // start with the first open
  isOpen = (i: number) => this.open().has(i);

  toggle(i: number) {
    const s = new Set(this.open());
    if (this.singleOpen) {
      s.clear();
      s.add(i);
    } else {
      s.has(i) ? s.delete(i) : s.add(i);
    }
    this.open.set(s);
  }

  /** Keyboard a11y for headers */
  onHeaderKey(i: number, ev: KeyboardEvent) {
    if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); this.toggle(i); }
    if ((ev.key === 'ArrowDown' || ev.key === 'ArrowRight') && i < this.items.length - 1) {
      (document.getElementById(this.headerId(i + 1)) as HTMLElement)?.focus();
    }
    if ((ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') && i > 0) {
      (document.getElementById(this.headerId(i - 1)) as HTMLElement)?.focus();
    }
  }

  headerId = (i: number) => `faq-header-${i}`;
  panelId  = (i: number) => `faq-panel-${i}`;

  /** Optional: subtle parallax for the right image (Angular HostListener, no inline JS) */
  private motionOk = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches;
  private raf: number | null = null;
  private ticking = false;
  offset = signal(0);

  @HostListener('window:scroll')
  onScroll() {
    if (!this.motionOk || this.ticking) return;
    this.ticking = true;
    this.raf = requestAnimationFrame(() => {
      this.offset.set(window.scrollY || 0);
      this.ticking = false;
    });
  }

  parallaxStyle(speed = 0.06) {
    if (!this.motionOk) return null;
    return `translate3d(0, ${this.offset() * speed}px, 0)`;
  }

  ngOnDestroy() { if (this.raf) cancelAnimationFrame(this.raf); }
}
