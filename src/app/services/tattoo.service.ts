import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tattoo } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TattooService {
  private mockTattoos: Tattoo[] = [
    {
      id: '1',
      imageUrl: 'https://placeholder.com/150',
      title: 'Dragon Tattoo',
      creator: 'artist1',
      likes: 150,
      createdAt: new Date()
    },
    // Add more mock tattoos here
  ];

  getTattoos(): Observable<Tattoo[]> {
    return of(this.mockTattoos);
  }

  generateTattoo(prompt: string): Observable<string> {
    // Implement AI generation logic here
    return of('https://placeholder.com/generated-tattoo');
  }
}