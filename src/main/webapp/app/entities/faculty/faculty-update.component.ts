import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFaculty, Faculty } from 'app/shared/model/faculty.model';
import { FacultyService } from './faculty.service';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject/subject.service';

@Component({
  selector: 'jhi-faculty-update',
  templateUrl: './faculty-update.component.html',
})
export class FacultyUpdateComponent implements OnInit {
  isSaving = false;
  subjects: ISubject[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    subjects: [],
  });

  constructor(
    protected facultyService: FacultyService,
    protected subjectService: SubjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ faculty }) => {
      this.updateForm(faculty);

      this.subjectService.query().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects = res.body || []));
    });
  }

  updateForm(faculty: IFaculty): void {
    this.editForm.patchValue({
      id: faculty.id,
      name: faculty.name,
      subjects: faculty.subjects,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const faculty = this.createFromForm();
    if (faculty.id !== undefined) {
      this.subscribeToSaveResponse(this.facultyService.update(faculty));
    } else {
      this.subscribeToSaveResponse(this.facultyService.create(faculty));
    }
  }

  private createFromForm(): IFaculty {
    return {
      ...new Faculty(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      subjects: this.editForm.get(['subjects'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFaculty>>): void {
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

  trackById(index: number, item: ISubject): any {
    return item.id;
  }

  getSelected(selectedVals: ISubject[], option: ISubject): ISubject {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
