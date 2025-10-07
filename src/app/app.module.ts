import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';
import { NgxTypedJsModule } from 'ngx-typed-js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/common/navbar/navbar.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {OurServicesComponent} from './components/common/our-services/our-services.component';
import {FaqComponent} from './components/common/faq/faq.component';
import {SubscribeComponent} from './components/common/subscribe/subscribe.component';
import {ContactComponent} from './components/common/contact/contact.component';
import {WelcomeComponent} from './components/common/welcome/welcome.component';
import {AboutComponent} from './components/common/about/about.component';
import {StrategyComponent} from './components/common/strategy/strategy.component';
import {WhoWeAreComponent} from './components/common/who-we-are/who-we-are.component';
import {CtaComponent} from './components/common/cta/cta.component';
import {BannerComponent} from './components/home/banner/banner.component';
import {NgxParticlesModule} from '@tsparticles/angular';
import {WhyWeDifferentComponent} from './components/common/why-we-different/why-we-different.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxScrollTopModule,
    CarouselModule,
    FormsModule,
    CountUpModule,
    NgxTypedJsModule,
    NavbarComponent,
    FooterComponent,
    OurServicesComponent,
    FaqComponent,
    SubscribeComponent,
    ContactComponent,
    WelcomeComponent,
    AboutComponent,
    StrategyComponent,
    WhoWeAreComponent,
    CtaComponent,
    BannerComponent,
    NgxParticlesModule,
    WhyWeDifferentComponent,
  ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
