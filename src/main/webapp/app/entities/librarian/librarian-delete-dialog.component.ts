import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILibrarian } from 'app/shared/model/librarian.model';
import { LibrarianService } from './librarian.service';

@Component({
  templateUrl: './librarian-delete-dialog.component.html',
})
export class LibrarianDeleteDialogComponent {
  librarian?: ILibrarian;

  constructor(protected librarianService: LibrarianService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.librarianService.delete(id).subscribe(() => {
      this.eventManager.broadcast('librarianListModification');
      this.activeModal.close();
    });
  }
}
