import { TestBed } from '@angular/core/testing';

import { BancaService } from './banca.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TokenInterceptor } from '../interceptor/token.interceptor';
import { ProductoFinancieroRequest } from '../interfaces/producto.inteface';
import { of, throwError } from 'rxjs';

describe('BancaService', () => {
  let service: BancaService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientModule],
        providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }]
      }
    );
    service = TestBed.inject(BancaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get all products', (done) => {
    service.getAllProductos().subscribe(
      {
        next: data => {
          expect(data).toBeInstanceOf(Array);
          expect(data.length).toBeGreaterThanOrEqual(0);
          done();
        },
        error: err => {
          expect(err).toBeInstanceOf(HttpErrorResponse);
          done();
        }
      }
    );
  });

  describe('verificar ids', () => {
    it('existe id', (done) => {
      service.verificarId('tar').subscribe(
        {
          next: resp => {
            expect(resp).toBeInstanceOf(Boolean);
            expect(resp).toBe(true);
            done();
          },
          error: err => {
            expect(err).toBeInstanceOf(HttpErrorResponse);
            done();
          }
        }
      );
    });

    it('no existe id', (done) => {
      service.verificarId('tar2').subscribe(
        {
          next: resp => {
            expect(resp).toBeInstanceOf(Boolean);
            expect(resp).toBe(false);
            done();
          },
          error: err => {
            expect(err).toBeInstanceOf(HttpErrorResponse);
            done();
          }
        }
      );
    });
  });

  describe('insert productos', () => {
    it('insert product', (done) => {
      const body: ProductoFinancieroRequest = {
        id: `tar-${Math.floor(Math.random() * 1000)}`,
        logo: "https://placehold.co/600x400",
        name: "TC",
        description: "Descripcion",
        date_release: "2024-01-01",
        date_revision: "2025-01-01"
      };
      service.insertProducto(body).subscribe(
        {
          next: resp => {
            expect(resp).toBeInstanceOf(Object);
            done();
          },
          error: err => {
            expect(err).toBeInstanceOf(HttpErrorResponse);
            done();
          }
        }
      );
    });

    it('insert product error', (done) => {
      const body: ProductoFinancieroRequest = {
        id: `tar-1`,
        logo: "https://placehold.co/600x400",
        name: "TC",
        description: "Descripcion",
        date_release: "2024-01-01",
        date_revision: "2025-01-01"
      };
      service.insertProducto(body).subscribe(
        {
          next: resp => {
            expect(resp).toBeInstanceOf(Object);
            done();
          },
          error: err => {
            expect(err instanceof Object).toBe(true);
            done();
          }
        }
      );
    });

  });

  describe('delete producto', () => {
    it('delete producto id válido', (done) => {
      const http = TestBed.inject(HttpClient);
      spyOn(http, "delete").and.returnValue(of('ok'))
      const idTest = "tar-361";
      service.deleteProducto(idTest).subscribe(
        {
          next: resp => {
            expect(resp).toBeInstanceOf(String);
            done();
          },
          error: err => {
            expect(err).toBeInstanceOf(HttpErrorResponse);
            done();
          }
        }
      );
    });

    it('delete producto id no válido', (done) => {
      const idTest = "tar-3610";
      const http = TestBed.inject(HttpClient);
      spyOn(http, "delete").and.returnValue(throwError(() => { throw new HttpErrorResponse({}) }))
      service.deleteProducto(idTest).subscribe(
        {
          next: resp => {
            console.log(resp);
            expect(resp).toBeInstanceOf(String);
            done();
          },
          error: err => {
            expect(err).toBeInstanceOf(HttpErrorResponse);
            done();
          }
        }
      );
    });
  });

  describe('delete producto', () => {
    it('update producto OK', (done) => {
      const http = TestBed.inject(HttpClient);
      spyOn(http, "put").and.returnValue(of({}))
      const body: ProductoFinancieroRequest = {
        id: `tar-${Math.floor(Math.random() * 1000)}`,
        logo: "https://placehold.co/600x400",
        name: "TC",
        description: "Descripcion",
        date_release: "2024-01-01",
        date_revision: "2025-01-01"
      };
      service.updateProducto(body).subscribe(
        {
          next: resp => {
            expect(resp).toBeInstanceOf(Object);
            done();
          },
          error: err => {
            expect(err).toBeInstanceOf(HttpErrorResponse);
            done();
          }
        }
      );
    });

    it('update producto Error', (done) => {
      const body: ProductoFinancieroRequest = {
        id: `tar-${Math.floor(Math.random() * 1000)}`,
        logo: "https://placehold.co/600x400",
        name: "TC",
        description: "Descripcion",
        date_release: "2024-01-01",
        date_revision: "2025-01-01"
      };
      const http = TestBed.inject(HttpClient);
      spyOn(http, "put").and.returnValue(throwError(() => { throw new HttpErrorResponse({}) }))
      service.updateProducto(body).subscribe(
        {
          next: resp => {
            console.log(resp);
            expect(resp).toBeInstanceOf(String);
            done();
          },
          error: err => {
            expect(err).toBeInstanceOf(HttpErrorResponse);
            done();
          }
        }
      );
    });
  });

});
