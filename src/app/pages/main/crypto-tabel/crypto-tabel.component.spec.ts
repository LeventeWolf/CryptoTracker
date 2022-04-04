import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoTabelComponent } from './crypto-tabel.component';

describe('CryptoTabelComponent', () => {
  let component: CryptoTabelComponent;
  let fixture: ComponentFixture<CryptoTabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoTabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
