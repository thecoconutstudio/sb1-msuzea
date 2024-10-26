import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TattooService } from '../../services/tattoo.service';
import { BodyMappingComponent } from '../body-mapping/body-mapping.component';

export interface Design {
  id: string;
  imageUrl: string;
  description: string;
  style: string;
  timestamp: Date;
}

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [CommonModule, FormsModule, BodyMappingComponent],
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent {
  description: string = '';
  selectedStyle: string = '';
  generatedDesigns: Design[] = [];
  currentDesign: Design | null = null;
  styles: string[] = [
    'Realistic',
    'Traditional American',
    'Geometric',
    'Minimalist',
    'Watercolor',
    'Tribal'
  ];

  constructor(private tattooService: TattooService) {}

  selectStyle(style: string) {
    this.selectedStyle = style;
  }

  generateDesign() {
    if (this.description && this.selectedStyle) {
      const prompt = `${this.description} in ${this.selectedStyle} style`;
      this.tattooService.generateTattoo(prompt).subscribe(imageUrl => {
        const newDesign: Design = {
          id: crypto.randomUUID(),
          imageUrl,
          description: this.description,
          style: this.selectedStyle,
          timestamp: new Date()
        };
        this.generatedDesigns.unshift(newDesign);
        this.currentDesign = newDesign;
      });
    }
  }

  selectDesign(design: Design) {
    this.currentDesign = design;
  }

  deleteDesign(designId: string) {
    this.generatedDesigns = this.generatedDesigns.filter(d => d.id !== designId);
    if (this.currentDesign?.id === designId) {
      this.currentDesign = this.generatedDesigns[0] || null;
    }
  }
}