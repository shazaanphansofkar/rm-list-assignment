import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ItemSelectorService } from './services/item-selector.service.js';
import { FolderComponent } from './folder/folder.js';
import { SortByPipe } from '../core/pipes/sort-by-pipe.js';

@Component({
  selector: 'app-item-selector',
  imports: [CommonModule, FolderComponent, SortByPipe],
  templateUrl: './item-selector.html',
  styleUrl: './item-selector.scss'
})
export class ItemSelector implements OnInit {

  private itemSelectorService = inject(ItemSelectorService);

  public data = this.itemSelectorService.folders;

  public selectedIds = computed(() => {
    const ids = [];
    this.data().forEach(folder => {
      this.itemSelectorService.getSelectedIds(folder, ids)
    });
    return ids;
  })

  public ngOnInit(): void {
    this.itemSelectorService.getFolders().pipe(take(1)).subscribe(response => {
      this.itemSelectorService.folders.set(response)
    });
  }

  clearSelection(): void {
    this.itemSelectorService.clearSelections();
  }

}
