import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoggedHeaderComponent } from './logged-header/logged-header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoggedHeaderComponent
  ],
  exports: [
    LoggedHeaderComponent
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
