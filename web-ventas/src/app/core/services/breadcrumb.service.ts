import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Injectable({providedIn: 'root'})
export class BreadcrumbService {

  private breadcrumbs: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
      });
  }

  // @ts-ignore
  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []) {
    const children = route.children;

    for (const child of children) {
      const routeConfig = child.snapshot.routeConfig;
      if (!routeConfig) continue;

      const routeURL = child.snapshot.url.map(s => s.path).join('/');
      const nextUrl = routeURL ? `${url}/${routeURL}` : url;

      const label = routeConfig.data?.['breadcrumb'];
      if (label) {
        breadcrumbs.push({label, routerLink: nextUrl});
      }

      return this.buildBreadcrumbs(child, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }

  getItems() {
    return this.breadcrumbs;
  }
}
