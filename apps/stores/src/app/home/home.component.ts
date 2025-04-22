import { Component } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FormulComponent } from './components/formul/formul.component';
import { MessageComponent } from './components/message/message.component';
import { FooterComponent } from './components/footer/footer.component';
import { GridCssComponent } from './components/grid/grid-css.component';
import { HeaderComponent } from '@stores/libs';
import { GridByCssComponent } from './components/grid-by-css/grid-by-css.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    SliderComponent,
    ChartsComponent,
    FormulComponent,
    MessageComponent,
    FooterComponent,
    GridCssComponent,
    HeaderComponent,
    GridByCssComponent,
  ],
})
export class HomeComponent {
}
