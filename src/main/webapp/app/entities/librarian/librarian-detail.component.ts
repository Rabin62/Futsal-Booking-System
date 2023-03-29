import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILibrarian } from 'app/shared/model/librarian.model';

@Component({
  selector: 'jhi-librarian-detail',
  templateUrl: './librarian-detail.component.html',
})
export class LibrarianDetailComponent implements OnInit {
  librarian: ILibrarian | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ librarian }) => (this.librarian = librarian));
  }

  previousState(): void {
    window.history.back();
  }
}
