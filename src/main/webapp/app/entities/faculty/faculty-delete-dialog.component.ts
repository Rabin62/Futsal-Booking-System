import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFaculty } from 'app/shared/model/faculty.model';
import { FacultyService } from './faculty.service';

@Component({
  templateUrl: './faculty-delete-dialog.component.html',
})
export class FacultyDeleteDialogComponent {
  faculty?: IFaculty;

  constructor(protected facultyService: FacultyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.facultyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('facultyListModification');
      this.activeModal.close();
    });
  }
}
