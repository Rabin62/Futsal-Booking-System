import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILibrarian, Librarian } from 'app/shared/model/librarian.model';
import { LibrarianService } from './librarian.service';
import { ILibrary } from 'app/shared/model/library.model';
import { LibraryService } from 'app/entities/library/library.service';

@Component({
  selector: 'jhi-librarian-update',
  templateUrl: './librarian-update.component.html',
})
export class LibrarianUpdateComponent implements OnInit {
  isSaving = false;
  libraries: ILibrary[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    address: [null, [Validators.required]],
    contactNo: [],
    email: [],
    libraryId: [],
  });

  constructor(
    protected librarianService: LibrarianService,
    protected libraryService: LibraryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ librarian }) => {
      this.updateForm(librarian);

      this.libraryService.queryAll().subscribe((res: HttpResponse<ILibrary[]>) => (this.libraries = res.body || []));
    });
  }

  updateForm(librarian: ILibrarian): void {
    this.editForm.patchValue({
      id: librarian.id,
      name: librarian.name,
      address: librarian.address,
      contactNo: librarian.contactNo,
      email: librarian.email,
      libraryId: librarian.libraryId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const librarian = this.createFromForm();
    if (librarian.id !== undefined) {
      this.subscribeToSaveResponse(this.librarianService.update(librarian));
    } else {
      this.subscribeToSaveResponse(this.librarianService.create(librarian));
    }
  }

  private createFromForm(): ILibrarian {
    return {
      ...new Librarian(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      address: this.editForm.get(['address'])!.value,
      contactNo: this.editForm.get(['contactNo'])!.value,
      email: this.editForm.get(['email'])!.value,
      libraryId: this.editForm.get(['libraryId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILibrarian>>): void {
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

  trackById(index: number, item: ILibrary): any {
    return item.id;
  }
}
