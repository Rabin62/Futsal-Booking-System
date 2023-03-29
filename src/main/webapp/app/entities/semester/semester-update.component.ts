import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISemester, Semester } from 'app/shared/model/semester.model';
import { SemesterService } from './semester.service';
import { IFaculty } from 'app/shared/model/faculty.model';
import { FacultyService } from 'app/entities/faculty/faculty.service';

@Component({
  selector: 'jhi-semester-update',
  templateUrl: './semester-update.component.html',
})
export class SemesterUpdateComponent implements OnInit {
  isSaving = false;
  faculties: IFaculty[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    facultyId: [null, Validators.required],
  });

  constructor(
    protected semesterService: SemesterService,
    protected facultyService: FacultyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ semester }) => {
      this.updateForm(semester);

      this.facultyService.queryAll().subscribe((res: HttpResponse<IFaculty[]>) => (this.faculties = res.body || []));
    });
  }

  updateForm(semester: ISemester): void {
    this.editForm.patchValue({
      id: semester.id,
      name: semester.name,
      facultyId: semester.facultyId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const semester = this.createFromForm();
    if (semester.id !== undefined) {
      this.subscribeToSaveResponse(this.semesterService.update(semester));
    } else {
      this.subscribeToSaveResponse(this.semesterService.create(semester));
    }
  }

  private createFromForm(): ISemester {
    return {
      ...new Semester(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      facultyId: this.editForm.get(['facultyId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISemester>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IFaculty): any {
    return item.id;
  }
}
