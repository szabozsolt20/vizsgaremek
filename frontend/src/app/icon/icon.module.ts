import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { Home, Users, User, Book, UserCheck, Upload, Archive } from 'angular-feather/icons';

const icons = {
  Home,
  Users,
  User,
  Book,
  UserCheck,
  Upload,
  Archive,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons), // csak az "icons" -ban felsoroltakat tölti be.
  ],
  exports: [ // hogy lássa az alkalmazásom kint is. és IconModule az appmodulba importálva
    FeatherModule,
  ],
})
export class IconModule { }
