import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TattooService } from '../../services/tattoo.service';
import { Tattoo } from '../../models/user.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  tattoos: Tattoo[] = [];
  filteredTattoos: Tattoo[] = [];
  currentFilter: string = 'All';
  filters: string[] = ['All', 'Popular', 'Recent', 'Traditional', 'Realistic', 'Geometric'];

  constructor(private tattooService: TattooService) {}

  ngOnInit() {
    this.tattooService.getTattoos().subscribe(
      tattoos => {
        this.tattoos = tattoos;
        this.filteredTattoos = tattoos;
      }
    );
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    if (filter === 'All') {
      this.filteredTattoos = this.tattoos;
    } else if (filter === 'Popular') {
      this.filteredTattoos = [...this.tattoos].sort((a, b) => b.likes - a.likes);
    } else if (filter === 'Recent') {
      this.filteredTattoos = [...this.tattoos].sort((a, b) => 
        b.createdAt.getTime() - a.createdAt.getTime()
      );
    } else {
      this.filteredTattoos = this.tattoos.filter(tattoo => 
        tattoo.title.toLowerCase().includes(filter.toLowerCase())
      );
    }
  }

  likeTattoo(tattoo: Tattoo) {
    tattoo.likes++;
  }
}