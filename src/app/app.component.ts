import { Component } from '@angular/core';
import { BancaService } from './core/services/banca.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private bancaService: BancaService) {
    this.bancaService.getAllProductos().subscribe(
      {
        next: e => {
          console.log(e);
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }
}
