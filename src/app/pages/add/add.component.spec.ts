import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BancaService } from 'src/app/core/services/banca.service';
import { CoreService } from 'src/app/core/services/core.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [HttpClientModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reiniciar form', () => {
    const spyBuildForm = spyOn(component as any, 'buildForm');
    component.reiniciar();
    expect(spyBuildForm).toHaveBeenCalled();
  });

  it('on init', () => {
    const spyBuildForm = spyOn(component as any, 'buildForm');
    component.ngOnInit();
    expect(spyBuildForm).toHaveBeenCalled();
  });

  describe('Get error message', () => {
    it('sin errores', () => {
      const control: any = { touched: false, dirty: false, errors: null };
      spyOn(component.form, 'get').and.returnValue(control);
      const result = component.getErrorMessage('id');
      expect(result).toEqual('');
    });

    it('required error', () => {
      const errors = {
        required: true
      };
      const control: any = { touched: true, dirty: false, errors };
      spyOn(component.form, 'get').and.returnValue(control);
      const result = component.getErrorMessage('id');
      expect(result).toEqual('Este campo es requerido.');
    });

    it('min length error', () => {
      const errors = {
        minlength: {
          requiredLength: 3
        }
      };
      const control: any = { touched: true, dirty: false, errors };
      spyOn(component.form, 'get').and.returnValue(control);
      const result = component.getErrorMessage('id');
      expect(result).toEqual(`Se requieren mínimo 3 caracteres.`);
    });

    it('max length error', () => {
      const errors = {
        maxlength: {
          requiredLength: 3
        }
      };
      const control: any = { touched: true, dirty: false, errors };
      spyOn(component.form, 'get').and.returnValue(control);
      const result = component.getErrorMessage('id');
      expect(result).toEqual(`Se requieren máximo 3 caracteres.`);
    });

    it('pattern error', () => {
      const errors = {
        pattern: true
      };
      const control: any = { touched: true, dirty: false, errors };
      spyOn(component.form, 'get').and.returnValue(control);
      const result = component.getErrorMessage('id');
      expect(result).toEqual('No es una URL válida.');
    });
  });

  describe('Enviar event', () => {
    it('show loading', () => {
      const core = TestBed.inject(CoreService);
      const spyLoading = spyOn(core, 'showLoading');
      component.enviar();
      expect(spyLoading).toHaveBeenCalled();
    });

    it('hide loading', () => {
      const core = TestBed.inject(CoreService);
      const spyLoading = spyOn(core, 'hideLoading');
      const banca = TestBed.inject(BancaService);
      spyOn(banca, 'verificarId').and.returnValue(throwError(() => { throw new Error('Error') }));
      component.enviar();
      expect(spyLoading).toHaveBeenCalled();
    });

    it('verificar id = true', () => {
      const core = TestBed.inject(CoreService);
      const spyLoading = spyOn(core, 'hideLoading');
      const banca = TestBed.inject(BancaService);
      spyOn(banca, 'verificarId').and.returnValue(of(true));
      component.enviar();
      expect(spyLoading).toHaveBeenCalled();
    });

    it('verificar id = false', () => {
      const banca = TestBed.inject(BancaService);
      spyOn(banca, 'verificarId').and.returnValue(of(false));
      spyOn(banca, 'insertProducto').and.returnValue(of({}));
      const spyInsertProduct = spyOn(component as any, 'insertProducto')
      component.enviar();
      expect(spyInsertProduct).toHaveBeenCalled();
    });

    it('insert producto OK', () => {
      const banca = TestBed.inject(BancaService);
      spyOn(banca, 'verificarId').and.returnValue(of(false));
      spyOn(banca, 'insertProducto').and.returnValue(of({}));
      const router = TestBed.inject(Router);
      const spyRouter = spyOn(router, 'navigateByUrl');
      component.enviar();
      expect(spyRouter).toHaveBeenCalledWith("/home");
    });

    it('insert producto Error', () => {
      const banca = TestBed.inject(BancaService);
      spyOn(banca, 'verificarId').and.returnValue(of(false));
      spyOn(banca, 'insertProducto').and.returnValue(throwError(() => { throw new Error("Error") }));
      const core = TestBed.inject(CoreService);
      const spyLoading = spyOn(core, 'hideLoading');
      component.enviar();
      expect(spyLoading).toHaveBeenCalled();
    });

  })


});
