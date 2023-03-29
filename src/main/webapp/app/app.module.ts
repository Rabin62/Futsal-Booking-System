import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { LmsSharedModule } from 'app/shared/shared.module';
import { LmsCoreModule } from 'app/core/core.module';
import { LmsAppRoutingModule } from './app-routing.module';
import { LmsHomeModule } from './home/home.module';
import { LmsEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    LmsSharedModule,
    LmsCoreModule,
    LmsHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    LmsEntityModule,
    LmsAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class LmsAppModule {}
