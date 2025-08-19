import { Component, inject, input} from '@angular/core';
import { Item } from '../item-selector.model';
import { ItemSelectorService } from '../services/item-selector.service.ts';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.scss'
})
export class ItemComponnent {

  public data = input.required<Item>();
  itemSelectorService = inject(ItemSelectorService);

  public toggleSelection(event: Event): void {
    this.data().isSelected = (event.target as HTMLInputElement).checked;
    this.itemSelectorService.updateFolderState();
  }
}
