import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ProductoFinancieroListar } from 'src/app/core/interfaces/producto.inteface';
import { BancaService } from 'src/app/core/services/banca.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss']
})
export class TableContentComponent implements OnChanges {
  //#region angular injetions
  private core = inject(CoreService);
  private banca = inject(BancaService);
  private router = inject(Router);
  //#endregion

  //#region angular communication component
  @Input("datos") datos: ProductoFinancieroListar[] = [];
  @Input("search") search = "";
  @Output("onRefresh") refresh = new EventEmitter<boolean>(false);
  //#endregion

  //#region public variables
  public pagina = 5;
  public dataPaginada: any[][] = [];
  public paginaActual = 0;
  //#endregion

  //#region angular life cycle
  ngOnChanges(changes: SimpleChanges) {
    if (changes["datos"] && changes["datos"].currentValue.length > 0) {
      this.updateTable(true);
    } else if (changes["search"]) {
      this.searchData();
    }
  }
  //#endregion

  //#region public methods
  public paginar(event: any) {
    this.pagina = Number(event.target.value);
    if (this.search.trim().length == 0) {
      this.updateTable();
      return;
    }
    this.updateTableFilter()
  }

  public changePage(page: number) {
    this.paginaActual = page;
  }

  public searchData() {
    if (this.search.trim().length == 0) {
      this.updateTable();
      return;
    }
    this.updateTableFilter(true);
  }

  public deleteItem(producto: ProductoFinancieroListar) {
    this.core.tituloProducto = producto.name;
    this.core.showModal();
    this.core.subModalData().pipe(take(1)).subscribe(
      {
        next: data => {
          if (data) {
            if (data.status == "Ok") {
              this.deleteItemService(producto.id);
            }
          }
        }
      });
  }

  public editProduct(producto: ProductoFinancieroListar) {
    this.router.navigateByUrl("/edit", { state: { data: producto } });
  }
  //#endregion

  //#region private methods
  private separarArray(data: any[], size: number) {
    const result = [];
    for (let i = 0; i < data.length; i += size) {
      result.push(data.slice(i, i + size));
    }
    return result;
  }

  private updateTable(reset = false) {
    this.dataPaginada = this.separarArray(this.datos, this.pagina);
    if (this.paginaActual >= this.dataPaginada.length || reset) {
      this.paginaActual = 0;
    }
  }

  private updateTableFilter(reset = false) {
    const data = this.datos.filter(e => e.name.toUpperCase().includes(this.search.toUpperCase()));
    this.dataPaginada = this.separarArray(data, this.pagina);
    if (reset) {
      this.paginaActual = 0;
    }
  }

  private deleteItemService(id: string) {
    this.banca.deleteProducto(id).subscribe(
      {
        next: () => {
          this.core.hideModal();
          this.core.showAlert("Registro eliminado con éxito.");
          this.refresh.next(true);
        },
        error: (err) => {
          console.error(err);
          this.core.hideModal();
          this.core.showAlert("No se pudo eliminar el registro.");
        }
      }
    );
  }
  //#endregion

}
