import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LmsSharedModule } from 'app/shared/shared.module';
import { LibraryComponent } from './library.component';
import { LibraryDetailComponent } from './library-detail.component';
import { LibraryUpdateComponent } from './library-update.component';
import { LibraryDeleteDialogComponent } from './library-delete-dialog.component';
import { libraryRoute } from './library.route';

@NgModule({
  imports: [LmsSharedModule, RouterModule.forChild(libraryRoute)],
  declarations: [LibraryComponent, LibraryDetailComponent, LibraryUpdateComponent, LibraryDeleteDialogComponent],
  entryComponents: [LibraryDeleteDialogComponent],
})
export class LmsLibraryModule {}
