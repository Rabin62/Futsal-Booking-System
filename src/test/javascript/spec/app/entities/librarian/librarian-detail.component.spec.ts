import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LmsTestModule } from '../../../test.module';
import { LibrarianDetailComponent } from 'app/entities/librarian/librarian-detail.component';
import { Librarian } from 'app/shared/model/librarian.model';

describe('Component Tests', () => {
  describe('Librarian Management Detail Component', () => {
    let comp: LibrarianDetailComponent;
    let fixture: ComponentFixture<LibrarianDetailComponent>;
    const route = ({ data: of({ librarian: new Librarian(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LmsTestModule],
        declarations: [LibrarianDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LibrarianDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LibrarianDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load librarian on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.librarian).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
