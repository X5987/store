import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface Weather {
  jour: string;
  temperature: number;
  condition: string;
  icon: string;
}
@Component({
  selector: 'app-slide-football-img',
  standalone: true,
  templateUrl: './slide-football-img.component.html',
  styleUrl: './slide-football-img.component.scss',
  imports: [MatIconModule],
})
export class SlideFootballImgComponent {
  weatherData: Weather[] = [
    {
      jour: 'Lundi',
      temperature: 20,
      condition: 'Ensoleillé',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Mardi',
      temperature: 18,
      condition: 'Nuageux',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Mercredi',
      temperature: 22,
      condition: 'Pluvieux',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Jeudi',
      temperature: 19,
      condition: 'Venteux',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Vendredi',
      temperature: 21,
      condition: 'Orageux',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Samedi',
      temperature: 23,
      condition: 'Ensoleillé',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Dimanche',
      temperature: 17,
      condition: 'Neigeux',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Lundi',
      temperature: 15,
      condition: 'Brumeux',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Mardi',
      temperature: 16,
      condition: 'Grêle',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Mercredi',
      temperature: 25,
      condition: 'Chaud',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Jeudi',
      temperature: 10,
      condition: 'Froid',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Vendredi',
      temperature: 20,
      condition: 'Partiellement nuageux',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Samedi',
      temperature: 22,
      condition: 'Orage',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    {
      jour: 'Sunday',
      temperature: 18,
      condition: 'Drizzle',
      icon: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
  ];
}
