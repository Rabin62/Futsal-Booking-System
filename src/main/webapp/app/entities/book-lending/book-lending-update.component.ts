import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBookLending, BookLending } from 'app/shared/model/book-lending.model';
import { BookLendingService } from './book-lending.service';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student/student.service';
import { IBook } from 'app/shared/model/book.model';
import { BookService } from 'app/entities/book/book.service';

type SelectableEntity = IStudent | IBook;

@Component({
  selector: 'jhi-book-lending-update',
  templateUrl: './book-lending-update.component.html',
})
export class BookLendingUpdateComponent implements OnInit {
  isSaving = false;
  students: IStudent[] = [];
  books: IBook[] = [];
  reserveDateDp: any;
  dueDateDp: any;
  returnedDateDp: any;


  editForm = this.fb.group({
    id: [],
    reserveDate: [null, [Validators.required]],
    dueDate: [null, [Validators.required]],
    returnedDate: [],
    note: [],
    studentId: [null, Validators.required],
    bookId: [null, Validators.required],
  });

  constructor(
    protected bookLendingService: BookLendingService,
    protected studentService: StudentService,
    protected bookService: BookService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bookLending }) => {
      this.updateForm(bookLending);

      this.studentService.queryAll().subscribe((res: HttpResponse<IStudent[]>) => (this.students = res.body || []));

      this.bookService.queryAll().subscribe((res: HttpResponse<IBook[]>) => (this.books = res.body || []));
    });
  }

  updateForm(bookLending: IBookLending): void {
    this.editForm.patchValue({
      id: bookLending.id,
      reserveDate: bookLending.reserveDate,
      dueDate: bookLending.dueDate,
      returnedDate: bookLending.returnedDate,
      note: bookLending.note,
      studentId: bookLending.studentId,
      bookId: bookLending.bookId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bookLending = this.createFromForm();
    if (bookLending.id !== undefined) {
      this.subscribeToSaveResponse(this.bookLendingService.update(bookLending));
    } else {
      this.subscribeToSaveResponse(this.bookLendingService.create(bookLending));
    }
  }

  private createFromForm(): IBookLending {
    return {
      ...new BookLending(),
      id: this.editForm.get(['id'])!.value,
      reserveDate: this.editForm.get(['reserveDate'])!.value,
      dueDate: this.editForm.get(['dueDate'])!.value,
      returnedDate: this.editForm.get(['returnedDate'])!.value,
      note: this.editForm.get(['note'])!.value,
      studentId: this.editForm.get(['studentId'])!.value,
      bookId: this.editForm.get(['bookId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBookLending>>): void {
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
