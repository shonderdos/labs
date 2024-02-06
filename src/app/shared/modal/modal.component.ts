import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ModalService } from './modal.service';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
})
export default class ModalComponent implements AfterViewInit {
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;

  constructor(
    private modalService: ModalService,
    private element: ElementRef
  ) {}

  @HostListener('document:keydown.escape')
  private onEscape() {
    // closing modal on escape
    this.modalService.close({ confirmed: false });
  }

  onClose(props?: { confirmed: boolean }) {
    // closing modal when clicking on the overlay
    this.modalService.close(props ?? undefined);
  }

  ngAfterViewInit() {
    const { minWidth, width, maxWidth, minHeight, height, maxHeight } = this.modalService.options?.size || {};

    //this.modal.nativeElement.style.minWidth = minWidth || 'auto';
    //this.modal.nativeElement.style.width = width || 'auto';
    //this.modal.nativeElement.style.maxWidth = maxWidth || 'auto';
    //this.modal.nativeElement.style.minHeight = minHeight || 'auto';
    //this.modal.nativeElement.style.height = height || 'auto';
    //this.modal.nativeElement.style.maxHeight = maxHeight || 'auto';
  }

  close() {
    this.modalService.options = undefined;
    this.element.nativeElement.remove();
  }
}
