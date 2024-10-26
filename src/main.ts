import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { App } from './app/app.component';
import { SignupComponent } from './app/components/signup/signup.component';
import { GalleryComponent } from './app/components/gallery/gallery.component';
import { DesignerComponent } from './app/components/designer/designer.component';

const routes: Routes = [
  { path: '', redirectTo: '/designer', pathMatch: 'full' },
  { path: 'designer', component: DesignerComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'gallery', component: GalleryComponent }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
}).catch(err => console.error(err));