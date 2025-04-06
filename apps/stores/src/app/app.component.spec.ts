import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Init AppComponent', () => {
    it('should AppComponent', () => {
      expect(component).toBeTruthy();
    });

    it('Should have the title', () => {
      expect(component.title).toContain('store');
    });


  });
});
