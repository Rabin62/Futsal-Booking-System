import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILibrary, Library } from 'app/shared/model/library.model';
import { LibraryService } from './library.service';

@Component({
  selector: 'jhi-library-update',
  templateUrl: './library-update.component.html',
})
export class LibraryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    address: [null, [Validators.required]],
    contactNo: [null, [Validators.required]],
  });

  constructor(protected libraryService: LibraryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ library }) => {
      this.updateForm(library);
    });
  }

  updateForm(library: ILibrary): void {
    this.editForm.patchValue({
      id: library.id,
      name: library.name,
      address: library.address,
      contactNo: library.contactNo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const library = this.createFromForm();
    if (library.id !== undefined) {
      this.subscribeToSaveResponse(this.libraryService.update(library));
    } else {
      this.subscribeToSaveResponse(this.libraryService.create(library));
    }
  }

  private createFromForm(): ILibrary {
    return {
      ...new Library(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      address: this.editForm.get(['address'])!.value,
      contactNo: this.editForm.get(['contactNo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILibrary>>): void {
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
}
