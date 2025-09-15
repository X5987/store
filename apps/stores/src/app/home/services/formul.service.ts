import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../components/formul/components/todo/todo.component';
import {
  AutoCompleteList,
  ListSelect,
  User,
} from '@stores/libs';

@Injectable({
  providedIn: 'root',
})
export class FormulService {
  private url = 'https://fakestoreapi.com';

  private http: HttpClient = inject(HttpClient);

  getListCountry(): Observable<ListSelect[]> {
    return of([
      {
        libelle: 'France',
        code: 'FR',
      },
      {
        libelle: 'Germany',
        code: 'DE',
      },
      {
        libelle: 'United States',
        code: 'US',
      },
      {
        libelle: 'Canada',
        code: 'CA',
      },
      {
        libelle: 'Australia',
        code: 'AU',
      },
    ]);
  }

  getListBrand(): Observable<AutoCompleteList[]> {
    return of([
      { code: '001', libelle: 'Apple' },
      { code: '002', libelle: 'Samsung' },
      { code: '003', libelle: 'Nike' },
      {
        code: '004',
        libelle: 'Adidas',
      },
      { code: '005', libelle: 'Sony' },
      { code: '006', libelle: 'Microsoft' },
      {
        code: '007',
        libelle: 'Google',
      },
      { code: '008', libelle: 'Amazon' },
      { code: '009', libelle: 'Coca-Cola' },
      {
        code: '010',
        libelle: 'Pepsi',
      },
      { code: '011', libelle: 'Toyota' },
      { code: '012', libelle: 'BMW' },
      {
        code: '013',
        libelle: 'Mercedes-Benz',
      },
      { code: '014', libelle: 'Intel' },
      { code: '015', libelle: 'Facebook' },
      {
        code: '016',
        libelle: 'Instagram',
      },
      { code: '017', libelle: 'Twitter' },
      { code: '018', libelle: 'Snapchat' },
      {
        code: '019',
        libelle: 'Netflix',
      },
      { code: '020', libelle: 'Spotify' },
      { code: '021', libelle: 'Tesla' },
      { code: '022', libelle: 'Uber' },
      {
        code: '023',
        libelle: 'Airbnb',
      },
      { code: '024', libelle: 'LG' },
      { code: '025', libelle: 'Panasonic' },
    ]);
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  getListTodo(): Observable<Todo[]> {
    return of([
      { id: 0, message: 'Faire des pommes', complete: false },
      { id: 1, message: 'Faire du sport', complete: true },
      { id: 2, message: 'Prendre les médicaments', complete: false },
      { id: 3, message: 'Taches ménagères', complete: true },
      { id: 4, message: 'Accompagnée mamie à la cave', complete: false },
      { id: 5, message: 'Accompagnée papi à la gare', complete: true },
      { id: 6, message: 'Accompagnée julie à la cave', complete: false },
      { id: 7, message: 'Accompagnée cacahouete', complete: true },
      { id: 8, message: 'Accompagnée renauld à la gare', complete: false },
      { id: 9, message: 'Accompagnée jéjé à la cave', complete: true },
      { id: 10, message: 'Accompagnée jean à la gare', complete: false },
    ]);
  }

  // getProductById(id: number): Observable<Product> {
  //   return this.http.get<Product>(`${this.url}/products/${id}`);
  // }
}
