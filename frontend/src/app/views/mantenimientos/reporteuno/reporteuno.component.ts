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
  selector: 'app-reporteuno',
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
  templateUrl: './reporteuno.component.html',
  styleUrl: './reporteuno.component.scss'
})
export class ReporteunoComponent {
  listaMantenimientos: MantenimientoModel[] = [];
  mantenimientoModelo: MantenimientoModel = new MantenimientoModel();

  constructor(private mantenimientoService: MantenimientoService) {
    //this.getMantenimientos();
  }

  buscarMantenimientos() {
    const usuarioId = this.mantenimientoModelo._id;
    this.mantenimientoService.getMantenimientosPorUsuario(usuarioId).subscribe({
      next: (response) => {
        this.listaMantenimientos = response.mantenimientos;
        console.log("esta es la respuesta", this.listaMantenimientos);
      },
      error: (error) => {
        console.error('Error al obtener los mantenimientos:', error);
      }
    });
  }

}
