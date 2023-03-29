import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubject } from 'app/shared/model/subject.model';

@Component({
  selector: 'jhi-subject-detail',
  templateUrl: './subject-detail.component.html',
})
export class SubjectDetailComponent implements OnInit {
  subject: ISubject | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subject }) => (this.subject = subject));
  }

  previousState(): void {
    window.history.back();
  }
}
