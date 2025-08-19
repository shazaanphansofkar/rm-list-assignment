import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(array: unknown, field: string, order: 'asc' | 'desc' = 'asc'): unknown {
    if (!Array.isArray(array) || !field) {
      return array;
    }

    const sorted = [...array].sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (valA == null || valB == null) return 0;

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }
}
