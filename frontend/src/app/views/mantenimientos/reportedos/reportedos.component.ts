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
  selector: 'app-reportedos',
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
  templateUrl: './reportedos.component.html',
  styleUrl: './reportedos.component.scss'
})
export class ReportedosComponent {
  listaMantenimientos: MantenimientoModel[] = [];
  mantenimientoModelo: MantenimientoModel = new MantenimientoModel();

  constructor(private mantenimientoService: MantenimientoService) {
    this.getMantenimientos();
  }

  getMantenimientos() {
    this.mantenimientoService.getMantenimientoUsuario().subscribe({
      next: (respuesta) => {
        console.log('es la respuesta de mantenimeinto Usuario', respuesta);
        this.listaMantenimientos = respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
