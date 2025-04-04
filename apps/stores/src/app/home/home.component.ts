import { Component } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FormulComponent } from './components/formul/formul.component';
import { MessageComponent } from './components/message/message.component';
import { FooterComponent } from './components/footer/footer.component';
import { GridCssComponent } from './components/grid/grid-css.component';
import { HeaderComponent } from '@stores/libs';
import { ChatDescription } from './class-test/chats-factory';
import { EmployeeFactory } from './class-test/employee.factory';
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
  constructor() {
    const listChats: ChatDescription[] = [
      {
        nom: 'claudia',
        surNom: 'cloclo',
        ageAnimal: 10,
        race: 'catonp',
        anniversaire:
          'Wed Feb 05 2025 16:53:37 GMT+0100 (heure normale d’Europe centrale)',
        size: 'size',
        color: 'color',
        familyName: 'michel',
        deathDate: new Date(),
        address: '14 rue des coco',
        phone: '0102050401',
      },
      {
        nom: 'felix',
        surNom: 'mimi',
        ageAnimal: null,
        race: 'siamois',
        anniversaire: new Date('2020-01-01'),
        size: 'small',
        color: 'white',
        familyName: 'dupont',
        deathDate: null,
        address: '25 avenue des chats',
        phone: '0203040506',
      },
      {
        nom: 'minou',
        surNom: 'minette',
        ageAnimal: 20,
        race: 'persan',
        anniversaire: '2018-03-15T00:00:00.000Z',
        size: 'medium',
        color: 'black',
        familyName: 'dubois',
        deathDate: null,
        address: '5 rue des minous',
        phone: '0304050607',
      },
      {
        nom: 'tigre',
        surNom: 'titi',
        ageAnimal: null,
        race: 'bengal',
        anniversaire: new Date('2022-06-10T00:00:00.000Z'),
        size: 'large',
        color: 'brown',
        familyName: 'leblanc',
        deathDate: null,
        address: '12 avenue des felins',
        phone: '0405060708',
      },
      {
        nom: 'pacha',
        surNom: 'pachou',
        ageAnimal: 2,
        race: 'maine coon',
        anniversaire: new Date('2023-01-25T00:00:00.000Z'),
        size: 'large',
        color: 'gray',
        familyName: 'martin',
        deathDate: null,
        address: '8 rue des aristocats',
        phone: '0506070809',
      },
    ];
    const formatChat = [];
    listChats.map((chat: ChatDescription) => {
      const employee = new EmployeeFactory(
        chat.nom!,
        chat.surNom!,
        chat.ageAnimal!,
        chat.anniversaire!,
        chat,
      );
      // console.log(employee.getAllSociete());
      formatChat.push(employee);
    });
  }
}
