import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SliderComponent } from './components/slider/slider.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FormulComponent } from './components/formul/formul.component';
import { MessageComponent } from './components/message/message.component';
import { FooterComponent } from './components/footer/footer.component';
import { GridCssComponent } from './components/grid/grid-css.component';
import { HeaderComponent } from '@stores/libs';
import { GridByCssComponent } from './components/grid-by-css/grid-by-css.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        SliderComponent,
        ChartsComponent,
        FormulComponent,
        MessageComponent,
        FooterComponent,
        GridCssComponent,
        HeaderComponent,
        GridByCssComponent,
      ],
      providers: [provideAnimations()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
  });

  it('should have the library app-slider', () => {
    const compiled = fixture.nativeElement;
    const appSlider = compiled.querySelector('app-slider');
    expect(appSlider).toBeTruthy();
  });
  it('should have the library app-charts', () => {
    const compiled = fixture.nativeElement;
    const appCharts = compiled.querySelector('app-charts');
    expect(appCharts).toBeTruthy();
  });
  it('should have the library app-formul', () => {
    const compiled = fixture.nativeElement;
    const appFormul = compiled.querySelector('app-formul');
    expect(appFormul).toBeTruthy();
  });
  it('should have the library app-message', () => {
    const compiled = fixture.nativeElement;
    const appMessage = compiled.querySelector('app-message');
    expect(appMessage).toBeTruthy();
  });
  it('should have the library app-grid-css', () => {
    const compiled = fixture.nativeElement;
    const appGridCss = compiled.querySelector('app-grid-css');
    expect(appGridCss).toBeTruthy();
  });
  it('should have the library app-footer', () => {
    const compiled = fixture.nativeElement;
    const appFooter = compiled.querySelector('app-footer');
    expect(appFooter).toBeTruthy();
  });
});
