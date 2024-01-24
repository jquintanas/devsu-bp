import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoFinancieroListar, ProductoFinancieroRequest } from '../interfaces/producto.inteface';

@Injectable({
  providedIn: 'root'
})
export class BancaService {

  constructor(private http: HttpClient) { }

  //#region public methods
  public getAllProductos() {
    return this.http.get<ProductoFinancieroListar[]>(environment.paths.productos).pipe(take(1));
  }

  public insertProducto(body: ProductoFinancieroRequest) {
    return this.http.post(environment.paths.productos, { body }).pipe(take(1));
  }

  public updateProducto(body: ProductoFinancieroRequest) {
    return this.http.put(environment.paths.productos, { body }).pipe(take(1));
  }

  public deleteProducto(id: string) {
    return this.http.delete(environment.paths.productos,
      {
        params: {
          id
        }
      }
    ).pipe(take(1));
  }

  public verificarId(id: string) {
    const params = { id };
    return this.http.get(environment.paths.verificacion, { params }).pipe(take(1));
  }
  //#endregion
}
