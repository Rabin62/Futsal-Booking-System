import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LmsTestModule } from '../../../test.module';
import { LibraryUpdateComponent } from 'app/entities/library/library-update.component';
import { LibraryService } from 'app/entities/library/library.service';
import { Library } from 'app/shared/model/library.model';

describe('Component Tests', () => {
  describe('Library Management Update Component', () => {
    let comp: LibraryUpdateComponent;
    let fixture: ComponentFixture<LibraryUpdateComponent>;
    let service: LibraryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LmsTestModule],
        declarations: [LibraryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LibraryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LibraryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LibraryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Library(123);
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
        const entity = new Library();
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
