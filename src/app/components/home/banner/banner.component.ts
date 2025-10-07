import { ViewportScroller } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {NgParticlesService, NgxParticlesModule} from '@tsparticles/angular';
import {loadSlim} from '@tsparticles/slim';
import {ParticlesConfig} from '../particles-config';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  imports: [
    NgxParticlesModule
  ]
})
export class BannerComponent implements OnInit {
  protected readonly ParticlesConfig = ParticlesConfig;

  constructor(
    private viewportScroller: ViewportScroller,
    private readonly ngParticlesService: NgParticlesService) {
  }

  ngOnInit() {
    this.ngParticlesService.init(async (engine) => {
      await loadSlim(engine);
    }).then(r => {
    });
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
