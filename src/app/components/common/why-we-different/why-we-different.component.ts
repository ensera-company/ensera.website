import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-why-we-different',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-we-different.component.html',
  styleUrls: ['./why-we-different.component.scss']
})
export class WhyWeDifferentComponent {
  constructor(private viewportScroller: ViewportScroller) {}

  onClick(anchorId: string) {
    this.viewportScroller.scrollToAnchor(anchorId);
  }
}
