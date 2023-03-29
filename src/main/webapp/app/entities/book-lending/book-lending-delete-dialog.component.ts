import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBookLending } from 'app/shared/model/book-lending.model';
import { BookLendingService } from './book-lending.service';

@Component({
  templateUrl: './book-lending-delete-dialog.component.html',
})
export class BookLendingDeleteDialogComponent {
  bookLending?: IBookLending;

  constructor(
    protected bookLendingService: BookLendingService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bookLendingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('bookLendingListModification');
      this.activeModal.close();
    });
  }
}
