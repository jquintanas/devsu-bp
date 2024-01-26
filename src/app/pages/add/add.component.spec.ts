import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BancaService } from 'src/app/core/services/banca.service';
import { CoreService } from 'src/app/core/services/core.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductoFinancieroListar } from 'src/app/core/interfaces/producto.inteface';

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

  describe('reiniciar form', () => {
    it('add route', () => {
      const router = {
        url: "/add"
      };
      const c: any = component;
      c.router = router;
      const spyBuildForm = spyOn(c, 'buildForm');
      component.reiniciar();
      expect(spyBuildForm).toHaveBeenCalled();
    });

    it('edit route', () => {
      const router = {
        url: "/edit"
      };
      const c: any = component;
      c.router = router;
      const spyBuildForm = spyOn(c, 'buildFormWithData');
      component.reiniciar();
      expect(spyBuildForm).toHaveBeenCalled();
    });

  });

  describe('on init', () => {
    it('add', () => {
      const router = {
        url: "/add"
      };
      const c: any = component;
      c.router = router;
      const spyBuildForm = spyOn(c, 'buildForm');
      component.ngOnInit();
      expect(spyBuildForm).toHaveBeenCalled();
    });

    it("edit", () => {
      const router = {
        url: "/edit",
        navigateByUrl: () => console.log(1)
      };
      const c: any = component;
      c.router = router;
      const data: ProductoFinancieroListar = {
        date_release: new Date(),
        date_revision: new Date(),
        description: "",
        id: "",
        logo: "",
        name: ""
      }
      c.dataForm = data;
      component.ngOnInit();
      expect(component.update).toEqual(true);
    });
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

  });

  describe('update fecha verificacion', () => {
    it('select date', () => {
      const event = {
        target: {
          value: "2024-01-01"
        }
      };
      component.updateFechaVerificacion(event);
      const verificacion = component.form.get("verificacion")?.value;
      expect(verificacion).toEqual("2025-01-01");

    });

    it('edit date', () => {
      const event = {
        target: {
          value: ""
        }
      };
      component.updateFechaVerificacion(event);
      const verificacion = component.form.get("verificacion")?.value;
      expect(verificacion).toEqual("");
    });
  });

  describe('update data', () => {
    it('call service ok', () => {
      const banca = TestBed.inject(BancaService);
      spyOn(banca, 'updateProducto').and.returnValue(of({}));
      const router = TestBed.inject(Router);
      const spy = spyOn(router, 'navigateByUrl');
      component.actualizar();
      expect(spy).toHaveBeenCalledWith("/home");
    });

    it('call service error', () => {
      const banca = TestBed.inject(BancaService);
      spyOn(banca, 'updateProducto').and.returnValue(throwError(() => { throw new Error("error") }));
      const core = TestBed.inject(CoreService);
      const spy = spyOn(core, 'showAlert');
      component.actualizar();
      expect(spy).toHaveBeenCalled();
    });
  });
});
