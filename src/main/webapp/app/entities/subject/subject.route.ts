import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISubject, Subject } from 'app/shared/model/subject.model';
import { SubjectService } from './subject.service';
import { SubjectComponent } from './subject.component';
import { SubjectDetailComponent } from './subject-detail.component';
import { SubjectUpdateComponent } from './subject-update.component';

@Injectable({ providedIn: 'root' })
export class SubjectResolve implements Resolve<ISubject> {
  constructor(private service: SubjectService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubject> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((subject: HttpResponse<Subject>) => {
          if (subject.body) {
            return of(subject.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Subject());
  }
}

export const subjectRoute: Routes = [
  {
    path: '',
    component: SubjectComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Subjects',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubjectDetailComponent,
    resolve: {
      subject: SubjectResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Subjects',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubjectUpdateComponent,
    resolve: {
      subject: SubjectResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Subjects',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubjectUpdateComponent,
    resolve: {
      subject: SubjectResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Subjects',
    },
    canActivate: [UserRouteAccessService],
  },
];
