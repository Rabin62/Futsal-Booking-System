import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBook, Book } from 'app/shared/model/book.model';
import { BookService } from './book.service';
import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from 'app/entities/author/author.service';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject/subject.service';

type SelectableEntity = IAuthor | ISubject;

@Component({
  selector: 'jhi-book-update',
  templateUrl: './book-update.component.html',
})
export class BookUpdateComponent implements OnInit {
  isSaving = false;
  authors: IAuthor[] = [];
  subjects: ISubject[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    publication: [],
    edition: [],
    isbn: [],
    quantity: [null, Validators.required],
    isAssigned: [],
    authorId: [null, Validators.required],
    subjectId: [null, Validators.required],
  });

  constructor(
    protected bookService: BookService,
    protected authorService: AuthorService,
    protected subjectService: SubjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ book }) => {
      this.updateForm(book);

      this.authorService.queryAll().subscribe((res: HttpResponse<IAuthor[]>) => (this.authors = res.body || []));

      this.subjectService.queryAll().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects = res.body || []));
    });
  }

  updateForm(book: IBook): void {
    this.editForm.patchValue({
      id: book.id,
      name: book.name,
      publication: book.publication,
      edition: book.edition,
      isbn: book.isbn,
      quantity : book.quantity,
      isAssigned: book.isAssigned,
      authorId: book.authorId,
      subjectId: book.subjectId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const book = this.createFromForm();
    if (book.id !== undefined) {
      this.subscribeToSaveResponse(this.bookService.update(book));
    } else {
      this.subscribeToSaveResponse(this.bookService.create(book));
    }
  }

  private createFromForm(): IBook {
    return {
      ...new Book(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      publication: this.editForm.get(['publication'])!.value,
      edition: this.editForm.get(['edition'])!.value,
      isbn: this.editForm.get(['isbn'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      isAssigned: this.editForm.get(['isAssigned'])!.value,
      authorId: this.editForm.get(['authorId'])!.value,
      subjectId: this.editForm.get(['subjectId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBook>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
