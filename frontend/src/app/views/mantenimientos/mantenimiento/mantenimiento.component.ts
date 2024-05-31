import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  RowComponent,
  ColComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  FormSelectDirective,
  TextColorDirective,
  ButtonDirective,
  TableDirective,
  TableColorDirective,
  TableActiveDirective,
  BorderDirective,
  AlignDirective,
} from '@coreui/angular';
import { DocsExampleComponent } from '@docs-components/public-api';
import { MantenimientoModel } from '../models/Mantenimiento.model';
import { MantenimientoService } from '../services/mantenimiento.service';
@Component({
  selector: 'app-mantenimiento',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TextColorDirective,
    FormSelectDirective,
    DocsExampleComponent,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective,
    ReactiveFormsModule,
    TableDirective,
    TableColorDirective,
    TableActiveDirective,
    BorderDirective,
    AlignDirective,
  ],
  templateUrl: './mantenimiento.component.html',
  styleUrl: './mantenimiento.component.scss',
})
export class MantenimientoComponent {
  listaMantenimientos: MantenimientoModel[] = [];
  mantenimientoModelo: MantenimientoModel = new MantenimientoModel();

  constructor(private mantenimientoService: MantenimientoService) {
    this.getMantenimientos();
  }

  getMantenimientos() {
    this.mantenimientoService.getTodosLosMantenimientos().subscribe({
      next: (respuesta) => {
        console.log('es la respuesta de getMantenimeinto', respuesta);
        this.listaMantenimientos = respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  guardarMantenimiento() {
    //console.log(this.mantenimientoModelo);
    if (this.mantenimientoModelo._id == ''){
      console.log("guardar", this.mantenimientoModelo);
      this.agregarMantenimiento();
    } else {
      console.log("editar", this.mantenimientoModelo);
      this.editarMantenimiento();
    }
  }
  eliminarMantenimiento(mantenimiento: MantenimientoModel) {
    console.log('item para eliminar', mantenimiento);
    this.mantenimientoService
      .eliminarMantenimiento(mantenimiento._id)
      .subscribe({
        next: (respuesta) => {
          console.log('Se elimino exitosamente !!!', respuesta);
          this.getMantenimientos();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  agregarMantenimiento(){
    this.mantenimientoService
      .agregarMantenimiento(this.mantenimientoModelo)
      .subscribe({
        next: (respuesta) => {
          console.log('Se guardo exitosamente !!!', respuesta);
          this.getMantenimientos();
          this.mantenimientoModelo = new MantenimientoModel();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  verMantenimiento(mantenimiento: MantenimientoModel){
    this.mantenimientoModelo = mantenimiento;//llena el formulario
  }
  //editarMantenimiento(mantenimiento: MantenimientoModel) {
  //this.mantenimientoModelo = mantenimiento;//llena el formulario
  //console.log("mantenimeinto a editar", mantenimiento);
    editarMantenimiento() {
    this.mantenimientoService
    .editarMantenimiento(this.mantenimientoModelo)
    .subscribe({
      next: (respuesta) => {
        console.log('Se modifico el registro exitosamente !!!', respuesta);
        this.getMantenimientos();
        this.mantenimientoModelo = new MantenimientoModel();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
