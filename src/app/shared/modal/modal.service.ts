import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import ModalComponent from './modal.component';
import { Options } from './types/options';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // Create a reference to our modal component
  newModalComponent!: ComponentRef<ModalComponent>;
  // Optional content passed at the creation : animation, size, ...
  options!: Options | undefined;
  subject: Subject<{ confirmed: boolean }> | undefined;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open(options?: Options) {
    this.options = options;
    this.newModalComponent = createComponent(ModalComponent, {
      environmentInjector: this.injector,
    });

    document.body.appendChild(this.newModalComponent.location.nativeElement);

    // Attach views to the changeDetection cycle
    this.appRef.attachView(this.newModalComponent.hostView);
    this.subject = new Subject();
    return this.subject;
  }

  close(props: { confirmed: boolean } = { confirmed: false }) {
    if (this.subject) this.subject.next(props);
    if (this.subject) this.subject.complete();

    this.newModalComponent.instance.close();
  }
}
