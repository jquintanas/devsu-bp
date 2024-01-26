import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContentComponent } from './table-content.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductoFinancieroListar } from 'src/app/core/interfaces/producto.inteface';
import { CoreService } from 'src/app/core/services/core.service';
import { of, throwError } from 'rxjs';
import { BancaService } from 'src/app/core/services/banca.service';

describe('TableContentComponent', () => {
  let component: TableContentComponent;
  let fixture: ComponentFixture<TableContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableContentComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(TableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("paginar", () => {
    it('paginar sin busqueda', () => {
      const event = {
        target: {
          value: "20"
        }
      };
      component.paginar(event);
      expect(component.pagina).toEqual(20);
    });

    it('paginar con busqueda', () => {
      const event = {
        target: {
          value: "20"
        }
      };
      component.search = "tar";
      component.paginar(event);
      expect(component.pagina).toEqual(20);
    });
  });

  describe("search Data", () => {
    it("termino busqueda", () => {
      component.search = "tar";
      component.searchData();
      expect(component.paginaActual).toBe(0);
    });

    it("sin termino busqueda", () => {
      const spyUpdate = spyOn(component as any, 'updateTable');
      component.search = "";
      component.searchData();
      expect(spyUpdate).toHaveBeenCalled();
    });
  });

  it("change page", () => {
    component.changePage(2);
    expect(component.paginaActual).toBe(2);
  })

  it("edit Product", () => {
    const router = TestBed.inject(Router);
    const spyRouter = spyOn(router, 'navigateByUrl');
    const producto: ProductoFinancieroListar = {
      date_release: new Date(),
      date_revision: new Date(),
      description: "",
      id: "",
      logo: "",
      name: ""
    };
    component.editProduct(producto);
    expect(spyRouter).toHaveBeenCalledWith("/edit", { state: { data: producto } });
  });

  describe("on changes", () => {
    it('change datos', () => {
      const producto: ProductoFinancieroListar = {
        date_release: new Date(),
        date_revision: new Date(),
        description: "",
        id: "",
        logo: "",
        name: ""
      };
      const currentValue = [producto];
      const change = {
        datos: {
          currentValue,
          previousValue: [],
          firstChange: true,
          isFirstChange: () => true
        }
      };
      const spy = spyOn(component as any, 'updateTable');
      component.ngOnChanges(change);
      expect(spy).toHaveBeenCalled();
    });

    it('change search', () => {
      const change = {
        search: {
          currentValue: "term",
          previousValue: "",
          firstChange: true,
          isFirstChange: () => true
        }
      };
      const spy = spyOn(component as any, 'searchData');
      component.ngOnChanges(change);
      expect(spy).toHaveBeenCalled();
    });

  });

  describe('delete item', () => {
    let producto: ProductoFinancieroListar = {
      date_release: new Date(),
      date_revision: new Date(),
      description: "",
      id: "",
      logo: "",
      name: "titulo"
    };

    it('check title', () => {
      const core = TestBed.inject(CoreService);
      component.deleteItem(producto);
      expect(core.tituloProducto).toBe(producto.name);
    });

    it("ok status", () => {
      const core = TestBed.inject(CoreService);
      spyOn(core, 'subModalData').and.returnValue(of({ status: "Ok" }));
      const spy = spyOn(component as any, 'deleteItemService');
      component.deleteItem(producto);
      expect(spy).toHaveBeenCalled();
    });

    it("delete item service ok", () => {
      const core = TestBed.inject(CoreService);
      spyOn(core, 'subModalData').and.returnValue(of({ status: "Ok" }));
      const banca = TestBed.inject(BancaService);
      const spyDeleteService = spyOn(banca, 'deleteProducto').and.returnValue(of(""));
      component.deleteItem(producto);
      expect(spyDeleteService).toHaveBeenCalled();
    });

    it("delete item service error", () => {
      const core = TestBed.inject(CoreService);
      spyOn(core, 'subModalData').and.returnValue(of({ status: "Ok" }));
      const banca = TestBed.inject(BancaService);
      spyOn(banca, 'deleteProducto').and.returnValue(throwError(() => { throw new Error("error") }));
      const spy = spyOn(core, 'hideModal');
      component.deleteItem(producto);
      expect(spy).toHaveBeenCalled();
    });
  })

  it('separar array', () => {
    const c: any = component;
    const result = c.separarArray([1, 2, 3], 5);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it('update table filter', () => {
    let producto: ProductoFinancieroListar = {
      date_release: new Date(),
      date_revision: new Date(),
      description: "",
      id: "",
      logo: "",
      name: "titulo"
    };
    component.datos = [producto];
    component.search = "";
    const c: any = component;
    c.updateTableFilter(true);
    expect(component.paginaActual).toBe(0);
  });

});
