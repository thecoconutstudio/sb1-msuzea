import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Design } from '../designer/designer.component';
import { UpgradeModalComponent } from '../upgrade-modal/upgrade-modal.component';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-body-mapping',
  standalone: true,
  imports: [CommonModule, UpgradeModalComponent],
  templateUrl: './body-mapping.component.html',
  styleUrls: ['./body-mapping.component.scss']
})
export class BodyMappingComponent {
  @Input() selectedDesign: Design | null = null;
  
  user$: Observable<User | null>;
  isDragging = false;
  previewImage: string | null = null;
  showUpgradeModal = false;
  
  overlayPosition = { x: 0, y: 0 };
  overlayScale = 1;
  overlayRotation = 0;
  isDraggingOverlay = false;
  dragStart = { x: 0, y: 0 };

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.processFile(file);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.processFile(file);
  }

  processFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewImage = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  startDragging(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.isDraggingOverlay = true;
    
    const pos = event instanceof MouseEvent ? event : event.touches[0];
    this.dragStart = {
      x: pos.clientX - this.overlayPosition.x,
      y: pos.clientY - this.overlayPosition.y
    };

    const moveHandler = (e: MouseEvent | TouchEvent) => {
      if (!this.isDraggingOverlay) return;
      
      const currentPos = e instanceof MouseEvent ? e : e.touches[0];
      this.overlayPosition = {
        x: currentPos.clientX - this.dragStart.x,
        y: currentPos.clientY - this.dragStart.y
      };
    };

    const stopDragging = () => {
      this.isDraggingOverlay = false;
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', stopDragging);
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('touchend', stopDragging);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchmove', moveHandler);
    document.addEventListener('touchend', stopDragging);
  }

  updateScale(event: Event) {
    this.overlayScale = parseFloat((event.target as HTMLInputElement).value);
  }

  rotateOverlay() {
    this.overlayRotation = (this.overlayRotation + 90) % 360;
  }

  resetImage() {
    this.previewImage = null;
    this.overlayPosition = { x: 0, y: 0 };
    this.overlayScale = 1;
    this.overlayRotation = 0;
  }

  savePreview() {
    // Implement save functionality
    console.log('Saving preview...');
  }
}