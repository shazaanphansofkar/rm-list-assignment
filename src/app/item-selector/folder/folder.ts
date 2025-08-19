import { Component, input, inject } from '@angular/core';
import { Folder,  } from '../item-selector.model';
import { ItemComponnent } from "../item/item";
import { SortByPipe } from '../../core/pipes/sort-by-pipe';
import { ItemSelectorService } from '../services/item-selector.service.ts';

@Component({
  selector: 'app-folder',
  imports: [ItemComponnent, SortByPipe],
  templateUrl: './folder.html',
  styleUrl: './folder.scss'
})
export class FolderComponent {

  public data = input.required<Folder>();
  itemSelectorService = inject(ItemSelectorService);

  private _isOpen: boolean = true; 

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(toggle: boolean) {
    this._isOpen = toggle;
  }

  public toggleSelection(event: Event): void {
      const value = (event.target as HTMLInputElement).checked;;
      this.itemSelectorService.setFolderSelection(this.data(), value);
  }
}
