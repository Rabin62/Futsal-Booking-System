import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFaculty } from 'app/shared/model/faculty.model';

@Component({
  selector: 'jhi-faculty-detail',
  templateUrl: './faculty-detail.component.html',
})
export class FacultyDetailComponent implements OnInit {
  faculty: IFaculty | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ faculty }) => (this.faculty = faculty));
  }

  previousState(): void {
    window.history.back();
  }
}
