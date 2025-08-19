import { inject, Injectable, signal } from '@angular/core';
import { ItemSelectorResource } from './item-selector.resource.js';
import { map, Observable } from 'rxjs';
import { Folder, Item, ItemsListFlat } from '../item-selector.model.js';

@Injectable({
  providedIn: 'root'
})
export class ItemSelectorService {

  private itemSelectorResource = inject(ItemSelectorResource);

  public folders = signal<Folder[]>([]);

  public getFolders(): Observable<Folder[]> {
    return this.itemSelectorResource.fetchItems().pipe(
      map(data => this.mapItemsFlatListToFolderList(data))
    );
  }

  public setFolderSelection(folder: Folder, value: boolean): void {
    folder.isSelected = value;
    folder.items!.forEach(i => i.isSelected = value);
    folder.children!.forEach(c => this.setFolderSelection(c, value));
    this.updateFolderState();
  }

  public updateFolderState(): void {
    this.folders.update((folders) => {
      folders.forEach(f => {
        this.updateChildrenState(f)
      });
      return [...folders]
    })
  }

  public getSelectedIds(folder: Folder, selectedIds: number[]): void {
    folder.items!.forEach(item => {
      if (item.isSelected)
        selectedIds.push(item.id);
    });
    if (!folder.children || folder.children.length === 0) {
      if (folder.isSelected)
        selectedIds.push(folder.id);
    } else {
      folder.children.forEach(f => {
        this.getSelectedIds(f, selectedIds);
      })
    }

  }

  public clearSelections() {
    this.resetSelections(this.folders());
    this.folders.update((f) => [...f]);
  }

  private mapItemsFlatListToFolderList(input: ItemsListFlat): Folder[] {

    const { columns: folderColumns, data: folderData } = input.folders;
    const { columns: itemColums, data: itemData } = input.items;

    const folders: Folder[] = [];

    // maps folders
    folderData.map((row) => {
      const folder: Record<string, any> = {};
      folderColumns.forEach((value: string, index) => {
        folder[value] = row[index];
      });
      folder["isSelected"] = false;

      folders.push(folder as Folder);
    });


    // map items and place in folders
    const items: Item[] = itemData.map((row) => {
      const item: Record<string, any> = {};
      itemColums.forEach((value: string, index) => {
        item[value] = row[index];
      });
      item["isSelected"] = false;

      return item as Item
    });

    // place items inside folder
    this.placeItemInsideFolder(items, folders);

    // place folders inside parent if any
    return this.placeFolderInsideParent(folders);

  }

  private placeItemInsideFolder(items: Item[], folders: Folder[]): void {
    folders.forEach(folder => {
      const itemsForParent = items.filter(i => i.folder_id === folder.id);
      folder.items = itemsForParent;
      items = items.filter(i => i.folder_id !== folder.id);
    })
  }

  private placeFolderInsideParent(folders: Folder[]): Folder[] {
    folders.forEach((folder) => {
      const foldersforParent = folders.filter(f => f.parent_id === folder.id);
      folder.children = foldersforParent;
      folders = folders.filter(f => f.parent_id !== folder.id);
    });

    return folders;
  }

  private updateChildrenState(folder: Folder): void {
    if (!folder.children || folder.children.length === 0) {
      folder.isSelected = folder.items!.every(i => i.isSelected);
      folder.isIndeterminante = !folder.isSelected && folder.items!.some(i => i.isSelected);
      return;
    }

    folder.children!.forEach(c => this.updateChildrenState(c));

    const allChildrenSelected = folder.children!.every(c => c.isSelected && !c.isIndeterminante) && folder.items!.every(i => i.isSelected);
    const someChildrenSelected = folder.children!.some(c => c.isSelected || c.isIndeterminante) || folder.items!.some(i => i.isSelected);

    folder.isSelected = allChildrenSelected;
    folder.isIndeterminante = !allChildrenSelected && someChildrenSelected;
  }

  private resetSelections(folders: Folder[]): void {
    folders.forEach(f => {
      f.isSelected = false;
      f.isIndeterminante = false;
      f.items!.forEach(i => i.isSelected = false);
      if (f.children) this.resetSelections(f.children);
    });
  };

}
