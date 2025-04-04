import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { WeatherService } from '../../services/weather-service';
import { WeatherCity } from '../../models/weather.interface';
import { finalize, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit, OnDestroy {
  weatherService: WeatherService = inject(WeatherService);
  weatherSpecificCity = signal<WeatherCity>({
    request: null,
    current: null,
    location: null,
  });
  isLoading = signal(false);
  private unsubscribe$ = new Subject<void>();
  protected currentCityWeather = this.weatherService.getCityWeather('Eragny');

  ngOnInit(): void {
    this.isLoading.set(true);
    this.currentCityWeather
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((data) => {
          this.weatherSpecificCity.set(data);
        }),
        finalize(() => this.isLoading.set(false)), // Fin du chargement
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }
}
