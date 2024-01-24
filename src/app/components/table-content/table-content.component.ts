import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss']
})
export class TableContentComponent {
  //#region angular communication component
  @Input("datos") datos: any[] = [];
  //#endregion

}
