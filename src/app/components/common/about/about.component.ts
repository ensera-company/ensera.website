import {
  Component, Input, signal, HostListener, computed, AfterViewInit, OnDestroy, ViewChildren, QueryList, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

type FeatureItem = { icon?: string; text: string };

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  animations: [
    // staggered entrance for the feature bullets (pure Angular animations)
    trigger('featureStagger', [
      transition(':enter', [
        query('.feature-item', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(60, animate('420ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))),
        ], { optional: true })
      ])
    ])
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  // top title
  @Input() brandName = 'Ensera';
  @Input() aboutIntro =
    'We craft AI-powered ecosystems that think, act, and evolve through multi-agent architectures and cloud-native precision. Each solution transforms data into clarity and automation into trust, grounded in the rigor of Secure SDLC and DevSecOps excellence. At Ensera, innovation is not just intelligent — it is agile, scalable, and inherently secure.';


// bullets (aligned with the image text)
  features = signal<FeatureItem[]>([
    { icon: 'fas fa-check', text: 'Multi-agent architectures' },
    { icon: 'fas fa-check', text: 'Cloud-native precision' },
    { icon: 'fas fa-check', text: 'Secure SDLC' },
    { icon: 'fas fa-check', text: 'DevSecOps excellence' },
    { icon: 'fas fa-check', text: 'Data → clarity' },
    { icon: 'fas fa-check', text: 'Automation you can trust' },
  ]);

// optional media (keep/change as you like)
  @Input() poster = 'images/about-company.jpg';
  @Input() youTubeId = 'VFNNIWw9W00';

  // popup
  isOpen = signal(false);
  get youtubeSrc() {
    return `https://www.youtube.com/embed/${this.youTubeId}?autoplay=1&mute=0&rel=0&modestbranding=1`;
  }
  openPopup() { this.isOpen.set(true); document.body.style.overflow = 'hidden'; }
  closePopup() { this.isOpen.set(false); document.body.style.overflow = ''; }

  // parallax (Angular bindings, no inline script)
  @ViewChildren('parallaxEl') parallaxEls!: QueryList<ElementRef<HTMLElement>>;
  private motionOk = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches;
  private rafId: number | null = null;
  private _pending = false;
  scrollY = signal(0);

  @HostListener('window:scroll')
  onScroll() {
    if (!this.motionOk) return;
    // throttle via rAF
    if (this._pending) return;
    this._pending = true;
    this.rafId = requestAnimationFrame(() => {
      this.scrollY.set(window.scrollY || window.pageYOffset || 0);
      this._pending = false;
    });
  }

  ngAfterViewInit() {
    // initialize once
    if (this.motionOk) this.scrollY.set(window.scrollY || 0);
  }

  ngOnDestroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  // style helper used in template: [style.transform]="parallaxStyle(speed)"
  parallaxStyle(speed: number) {
    if (!this.motionOk) return null;
    const y = this.scrollY() * speed;
    return `translate3d(0, ${y}px, 0)`;
  }
}
