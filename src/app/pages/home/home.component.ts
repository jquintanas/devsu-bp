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
    this.bancoService.getAllProductos().subscribe(
      {
        next: resp => {
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
