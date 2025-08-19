import { TestBed } from '@angular/core/testing';

import { ItemSelectorResource } from './item-selector.resource.ts';

describe('ItemSelectorResourceTs', () => {
  let service: ItemSelectorResource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemSelectorResource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
