import { Component } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
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
@Component({
  selector: 'app-reportes',
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
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {

}
