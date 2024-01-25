import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoFinancieroRequest } from 'src/app/core/interfaces/producto.inteface';
import { BancaService } from 'src/app/core/services/banca.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  //#region public variables
  public form!: FormGroup;
  //#endregion

  constructor(
    private fb: FormBuilder,
    private banca: BancaService,
    private core: CoreService,
    private router: Router
  ) { }

  //#region angular life cycle
  ngOnInit() {
    this.buildForm();
  }
  //#endregion

  //#region public methods
  public enviar() {
    this.core.showLoading();
    const { id, description, liberacion, name, logo } = this.form.value;
    const revision = this.form.get("verificacion")?.value;
    this.banca.verificarId(id).subscribe(
      {
        next: resp => {
          console.log(resp);
          if (!resp) {
            const body: ProductoFinancieroRequest = {
              id,
              description,
              logo,
              name,
              date_release: liberacion,
              date_revision: revision
            }
            this.insertProducto(body);
            return;
          }
          this.core.hideLoading();
        },
        error: err => {
          console.log(err);
          this.core.hideLoading();
        }
      }
    );
  }

  public reiniciar() {
    this.buildForm();
  }

  public getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (control && (control.touched || control.dirty) && control.errors != null) {
      if (control.errors['required'] != null) {
        return "Este campo es requerido.";
      }
      if (control.errors['minlength'] != null) {
        return `Se requieren mínimo ${control.errors['minlength'].requiredLength} caracteres.`;
      }
      if (control.errors['maxlength'] != null) {
        return `Se requieren máximo ${control.errors['maxlength'].requiredLength} caracteres.`;
      }
      if (control.errors['pattern'] != null) {
        return "No es una URL válida.";
      }
    }
    return "";
  }
  //#endregion

  //#region private methods
  private formatDateToString(date: Date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  private buildForm() {
    const now = new Date();
    const nextDate = new Date();
    nextDate.setFullYear(nextDate.getFullYear() + 1);
    this.form = this.fb.group(
      {
        id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
        name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
        description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
        logo: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/\S+$/)]),
        liberacion: new FormControl(this.formatDateToString(now), [Validators.required]),
        verificacion: new FormControl({ value: this.formatDateToString(nextDate), disabled: true }, [Validators.required])
      }
    );
  }

  private insertProducto(body: ProductoFinancieroRequest) {
    this.banca.insertProducto(body).subscribe(
      {
        next: resp => {
          console.log(resp);
          this.buildForm();
          this.core.hideLoading();
          this.router.navigateByUrl("/home");
        },
        error: err => {
          console.log(err);
          this.core.hideLoading();
        }
      }
    );
  }
  //#endregion

}
