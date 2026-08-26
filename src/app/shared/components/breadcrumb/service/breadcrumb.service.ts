import {inject, Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Breadcrumb} from '@shared/components/breadcrumb/model/breadcrumb';
import {BehaviorSubject, filter} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private readonly breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);

  readonly breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {

        const breadcrumbs = this.buildBreadcrumbs(
          this.activatedRoute.root
        );

        this.breadcrumbsSubject.next(breadcrumbs);

      });

  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {

    const children = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {

      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL) {url += `/${routeURL}`;}

      let label = child.snapshot.data['breadcrumb'];

      // resolver dynamic breadcrumb
      if(typeof label === 'function'){
        label = label(child.snapshot.data);
      }

      if (label) {breadcrumbs.push({label, url});}

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
