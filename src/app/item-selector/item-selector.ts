import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { ItemSelectorService } from './services/item-selector.service.js';
import { FolderComponent } from './folder/folder.js';
import { SortByPipe } from '../core/pipes/sort-by-pipe.js';
import { Folder } from './item-selector.model.js';

@Component({
  selector: 'app-item-selector',
  imports: [CommonModule, FolderComponent, SortByPipe],
  templateUrl: './item-selector.html',
  styleUrl: './item-selector.scss'
})
export class ItemSelector {

  public data = input.required<Folder[]>();

  public itemSelected = output<number[]>();

  private itemSelectorService = inject(ItemSelectorService);

  constructor() {
    effect(() => {
      const ids = [];
      this.data().forEach(folder => {
        this.itemSelectorService.getSelectedIds(folder, ids)
      });
      this.itemSelected.emit(ids);
    });
  }

}
