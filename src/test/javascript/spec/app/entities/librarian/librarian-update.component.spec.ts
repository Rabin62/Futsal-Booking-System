import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LmsTestModule } from '../../../test.module';
import { LibrarianUpdateComponent } from 'app/entities/librarian/librarian-update.component';
import { LibrarianService } from 'app/entities/librarian/librarian.service';
import { Librarian } from 'app/shared/model/librarian.model';

describe('Component Tests', () => {
  describe('Librarian Management Update Component', () => {
    let comp: LibrarianUpdateComponent;
    let fixture: ComponentFixture<LibrarianUpdateComponent>;
    let service: LibrarianService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LmsTestModule],
        declarations: [LibrarianUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LibrarianUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LibrarianUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LibrarianService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Librarian(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Librarian();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
