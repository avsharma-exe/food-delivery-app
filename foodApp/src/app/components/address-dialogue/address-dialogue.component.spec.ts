import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDialogueComponent } from './address-dialogue.component';

describe('AddressDialogueComponent', () => {
  let component: AddressDialogueComponent;
  let fixture: ComponentFixture<AddressDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
