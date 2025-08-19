import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemsListFlat } from '../item-selector.model';

@Injectable({
  providedIn: 'root'
})
export class ItemSelectorResource {
   private httpClient = inject(HttpClient);
  
    private url = 'response.json';

    public fetchItems(): Observable<ItemsListFlat> {
      return this.httpClient.get<ItemsListFlat>(this.url);
    }
 
}
