import {
  Component, Input, signal, OnInit, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

// tsparticles (Angular wrapper + engine loader)
import { NgxParticlesModule } from '@tsparticles/angular';
import type { Container, ISourceOptions, RecursivePartial } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

type WhoItem = { icon: string; title: string; text: string; badge?: string };

@Component({
  selector: 'app-who-we-are',
  standalone: true,
  imports: [CommonModule, NgxParticlesModule],
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.scss']
})
export class WhoWeAreComponent implements OnInit, AfterViewInit {
  /** Headings */
  @Input() title = 'Who We';
  @Input() titleStrong = 'Are';
  @Input() subtitle =
    'A multi-disciplinary team building secure, cloud-native, multi-agent solutions—from strategy to production.';
  @Input() kicker = 'Think • Build • Scale';
  @Input() shapeUrl = 'images/shape1.png';
  /** Cards (data-driven) */
  @Input({ required: false }) items: WhoItem[] = [
    {
      icon: 'fa-solid fa-users',
      title: 'Professionals at Heart',
      text: 'Clear process, accountable delivery, and measurable outcomes across every engagement.',
      badge: '1',
    },
    {
      icon: 'fa-regular fa-lightbulb',
      title: 'Relentlessly Curious',
      text: 'We prototype, test, and learn fast—turning research into products that ship.',
      badge: '2',
    },
    {
      icon: 'fa-solid fa-wand-sparkles',
      title: 'Creative with Purpose',
      text: 'Human-centered design that looks elegant, reads clearly, and converts.',
      badge: '3',
    },
    {
      icon: 'fa-regular fa-object-group',
      title: 'Design Systems First',
      text: 'Accessible UI libraries, tokens, and guidelines that scale across teams.',
      badge: '4',
    },
    {
      icon: 'fa-brands fa-android', // or another icon you prefer
      title: 'Engineering that Scales',
      text: 'Cloud-native, observable, CI/CD-driven stacks ready for rapid change.',
      badge: '5',
    },
    {
      icon: 'fa-regular fa-life-ring',
      title: 'Support that Stays',
      text: 'Proactive monitoring, fast incident response, and continuous improvement.',
      badge: '6',
    },
  ];

  /** Particles options (updated after reading CSS variables to match theme) */
  particlesOptions = signal<RecursivePartial<ISourceOptions>>({});

  // Load the slim bundle once (smaller than full)
  async ngOnInit() {
    // Nothing else needed here; loadSlim is called in ngAfterViewInit via init callback
  }

  ngAfterViewInit() {
    // Read CSS variables so particles match your theme (works with dark mode)
    const root = getComputedStyle(document.documentElement);
    const mainColor   = root.getPropertyValue('--mainColor').trim() || '#C6A664';
    const fontColor   = root.getPropertyValue('--fontColor').trim() || '#E8EBEF';
    const borderColor = root.getPropertyValue('--borderColor').trim() || '#24314A';

    this.particlesOptions.set({
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      fullScreen: { enable: false }, // we’ll position inside the section
      particles: {
        number: { value: 40, density: { enable: true, height: 800, width: 800 } },
        color: { value: mainColor },
        links: {
          enable: true,
          color: borderColor,
          opacity: 0.35,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.6,
          outModes: { default: 'out' },
          direction: 'none'
        },
        opacity: { value: 0.35 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
        // gentle parallax-ish drift on hover
        wobble: { enable: false }
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: true, mode: 'repulse' },
          onClick: { enable: false, mode: 'push' }
        },
        modes: {
          repulse: { distance: 80, duration: 0.3 }
        }
      }
    });
  }

  /** Called by ngx-particles to init the engine with the slim bundle */
  async particlesInit(engine: any) {
    await loadSlim(engine);
  }

  particlesLoaded(_container: Container | undefined) {
    // no-op, but you can tap into container here if needed
  }
}
