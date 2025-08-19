import { Component, inject, OnInit, signal } from '@angular/core';
import { ItemSelector } from './item-selector/item-selector';
import { ItemSelectorService } from './item-selector/services/item-selector.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ItemSelector],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{

  public selectedIds: number[] = [];
  public loading: boolean = true;
  public error: string | null = null;

  private itemSelectorService = inject(ItemSelectorService);
  public data = this.itemSelectorService.folders;

  public ngOnInit(): void {
    this.loading = true;
    this.error = null;
    this.itemSelectorService.getFolders().pipe(take(1)).subscribe({
      next: (response) => {
        this.itemSelectorService.folders.set(response);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = "Some error occurred while fetching data";
      }
    });
  }

  clearSelection(): void {
    this.itemSelectorService.clearSelections();
  }

  setSelectionsIds(ids: number[]): void {
    this.selectedIds = ids;
  }

}
