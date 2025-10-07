import {
  Component, Input, signal, HostListener, AfterViewInit, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

type FeatureItem = { icon?: string; text: string };

@Component({
  selector: 'app-strategy',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('featureStagger', [
      transition(':enter', [
        query('.feature-item', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(60, animate('420ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))),
        ], { optional: true })
      ])
    ])
  ],
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements AfterViewInit, OnDestroy {
  /** Headings */
  @Input() eyebrow = 'Highly Creative Solutions';
  @Input() titlePrefix = 'About';
  @Input() titleStrong = 'Strategy';
  @Input() introTop = 'We align brand strategy with measurable digital execution.';
  @Input() introBottom = 'From discovery to delivery, we ship fast, accessible, and maintainable work.';

  /** Media & shapes */
  @Input() imageUrl = 'images/about-strategy.jpg';
  @Input() shapeUrl = 'images/shape1.png';
  @Input() imageAlt = 'Strategy';

  /** Bullets */
  features = signal<FeatureItem[]>([
    { icon: 'fa fa-check', text: 'Creative Design' },
    { icon: 'fa fa-check', text: 'Retina Ready' },
    { icon: 'fa fa-check', text: 'Responsive Design' },
    { icon: 'fa fa-check', text: 'Modern Design' },
    { icon: 'fa fa-check', text: 'Awesome Design' },
    { icon: 'fa fa-check', text: 'Digital Marketing & Branding' },
  ]);

  /** Parallax */
  private motionOk = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches;

  scrollY = signal(0);
  private rafId: number | null = null;
  private ticking = false;

  @HostListener('window:scroll')
  onScroll() {
    if (!this.motionOk || this.ticking) return;
    this.ticking = true;
    this.rafId = requestAnimationFrame(() => {
      this.scrollY.set(window.scrollY || window.pageYOffset || 0);
      this.ticking = false;
    });
  }

  ngAfterViewInit() {
    if (this.motionOk) this.scrollY.set(window.scrollY || 0);
  }

  ngOnDestroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  /** Use in template: [style.transform]="parallax(0.06)" */
  parallax(speed: number) {
    if (!this.motionOk) return null;
    const y = this.scrollY() * speed;
    return `translate3d(0, ${y}px, 0)`;
  }

  /** Background style helper */
  bgStyle() {
    return {
      'background-image': `url('${this.imageUrl}')`
    };
  }
}
