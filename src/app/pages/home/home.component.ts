import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoFinancieroListar } from 'src/app/core/interfaces/producto.inteface';
import { BancaService } from 'src/app/core/services/banca.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //#region public variables
  public productos = signal<ProductoFinancieroListar[]>([]);
  public terminoBusqueda = "";
  //#endregion

  constructor(
    private bancoService: BancaService,
    private core: CoreService,
    private router: Router
  ) { }

  //#region angular life cycle
  public ngOnInit() {
    this.core.showLoading();
    this.terminoBusqueda = "";
    this.bancoService.getAllProductos().subscribe(
      {
        next: resp => {
          resp.forEach(e => {
            if (typeof e.date_release == "string") {
              const dateString = e.date_release as string;
              const stringDate = dateString.split("T")[0].split("-");
              if (stringDate.length == 3) {
                const anio = parseInt(stringDate[0], 10);
                const mes = parseInt(stringDate[1], 10) - 1;
                const dia = parseInt(stringDate[2], 10);
                e.date_release = new Date(anio, mes, dia);
              }
            }
            if (typeof e.date_revision == "string") {
              const dateString = e.date_revision as string;
              const stringDate = dateString.split("T")[0].split("-");
              if (stringDate.length == 3) {
                const anio = parseInt(stringDate[0], 10);
                const mes = parseInt(stringDate[1], 10) - 1;
                const dia = parseInt(stringDate[2], 10);
                e.date_revision = new Date(anio, mes, dia);
              }
            }
          });
          this.productos.set(resp);
          this.core.hideLoading();
        },
        error: err => {
          console.error(err);
          this.core.showAlert(JSON.stringify(err.error))
          this.core.hideLoading();
        }
      }
    )
  }
  //#endregion

  //#region public methods
  public addProduct() {
    this.router.navigateByUrl("/add")
  }
  //#endregion
}
