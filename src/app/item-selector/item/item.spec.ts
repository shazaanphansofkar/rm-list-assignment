import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponnent } from './item';

describe('Item', () => {
  let component: ItemComponnent;
  let fixture: ComponentFixture<ItemComponnent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponnent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemComponnent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
