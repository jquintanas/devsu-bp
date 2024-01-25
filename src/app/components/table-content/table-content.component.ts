import { Component, Input } from '@angular/core';
import { ProductoFinancieroListar } from 'src/app/core/interfaces/producto.inteface';

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss']
})
export class TableContentComponent {
  //#region angular communication component
  @Input("datos") datos: ProductoFinancieroListar[] = [];
  //#endregion

}
