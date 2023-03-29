import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISemester } from 'app/shared/model/semester.model';
import { SemesterService } from './semester.service';

@Component({
  templateUrl: './semester-delete-dialog.component.html',
})
export class SemesterDeleteDialogComponent {
  semester?: ISemester;

  constructor(protected semesterService: SemesterService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.semesterService.delete(id).subscribe(() => {
      this.eventManager.broadcast('semesterListModification');
      this.activeModal.close();
    });
  }
}
