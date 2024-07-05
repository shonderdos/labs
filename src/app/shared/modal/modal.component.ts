import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
export default class ModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;

  constructor(
    private modalService: ModalService,
    private element: ElementRef
  ) {
    console.log(this.modalService.options);
  }

  title = this.modalService.options?.content.title || 'Delete driver';
  body =
    this.modalService.options?.content.body ||
    'Are you sure you want to delete this driver? This action can not be undone!';

  @HostListener('document:keydown.escape')
  private onEscape() {
    // closing modal on escape
    this.modalService.close({ confirmed: false });
  }

  onClose(props?: { confirmed: boolean }) {
    // closing modal when clicking on the overlay
    this.modalService.close(props ?? undefined);
  }

  close() {
    this.modalService.options = undefined;
    this.element.nativeElement.remove();
  }
}
