import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILibrary } from 'app/shared/model/library.model';
import { LibraryService } from './library.service';

@Component({
  templateUrl: './library-delete-dialog.component.html',
})
export class LibraryDeleteDialogComponent {
  library?: ILibrary;

  constructor(protected libraryService: LibraryService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.libraryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('libraryListModification');
      this.activeModal.close();
    });
  }
}
