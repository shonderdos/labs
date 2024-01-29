import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ButtonComponent],
})
export class PageWrapperComponent {
  @Input({ required: true }) heading: string = 'Fill in page heading';
  private router = inject(Router);
  public breadcrumbs = inject(ActivatedRoute).pathFromRoot.reduce(
    (acc, route) => {
      if (route.snapshot.data['breadcrumb'] && route.snapshot.url.length) {
        const parentUrl = acc[acc.length - 1]?.url ?? '';
        acc.push({
          label: route.snapshot.data['breadcrumb'],
          url: parentUrl.concat('/', route.snapshot.url.join('/')),
        });
      }
      return acc;
    },
    [] as { label: string; url: string }[]
  );

  public navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
