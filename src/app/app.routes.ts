import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'item-selection',
        loadComponent: () => import('./item-selector/item-selector').then(m => m.ItemSelector)
    },
    {
        path: '**',
        redirectTo: 'item-selection'
    }
];
