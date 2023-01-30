import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-standings-card',
  template: '<div class="wrapper" [ngClass]="constructorId"><ng-content></ng-content></div>',
  styles: [
    `
      .wrapper {
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: 1px solid rgba(200, 200, 200, 0.1);
        height: 53px;
        padding: 20px 120px 20px 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 380px;
        margin: 35px auto;

        background-color: #313131;
        background-image: linear-gradient(to bottom right, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.65) 75%);
        position: relative;
      }

      .ferrari {
        background-color: rgb(237, 28, 36);
      }

      .red_bull {
        background-color: rgb(30, 91, 198);
      }

      .mercedes {
        background-color: rgb(108, 211, 191);
      }

      .mclaren {
        background-color: rgb(245, 128, 32);
      }

      .alfa {
        background-color: rgb(172, 32, 57);
      }

      .alpine {
        background-color: rgb(34, 147, 209);
      }

      .alphatauri {
        background-color: rgb(78, 124, 155);
      }

      .haas {
        background-color: rgb(182, 186, 189);
      }

      .aston_martin {
        background-color: rgb(45, 130, 109);
      }

      .williams {
        background-color: rgb(55, 190, 221);
      }
    `,
  ],
  imports: [CommonModule],
})
export class StandingsCardComponent {
  @HostBinding('class.someClass') someField = false;
  @Input() public constructorId: string | undefined;
}
