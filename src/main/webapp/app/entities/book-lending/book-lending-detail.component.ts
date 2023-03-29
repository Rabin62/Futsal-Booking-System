import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBookLending } from 'app/shared/model/book-lending.model';

@Component({
  selector: 'jhi-book-lending-detail',
  templateUrl: './book-lending-detail.component.html',
})
export class BookLendingDetailComponent implements OnInit {
  bookLending: IBookLending | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bookLending }) => (this.bookLending = bookLending));
  }

  previousState(): void {
    window.history.back();
  }
}
