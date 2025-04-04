import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WeatherCity } from '../models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http: HttpClient = inject(HttpClient);

  // https://weatherstack.com/documentation
  private apiWeaterKey: string = '1812b36366e8be3fcc170e28b786c5c0';
  private url: string = `https://api.weatherstack.com/current?access_key=${this.apiWeaterKey}`;

  getCityWeather(city: string): Observable<WeatherCity> {
    return this.http.get<WeatherCity>(`${this.url}&query=${city}`);
  }
}
