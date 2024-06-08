import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatMenuPlayerComponent } from './combat-menu-player.component';

describe('CombatMenuPlayerComponent', () => {
  let component: CombatMenuPlayerComponent;
  let fixture: ComponentFixture<CombatMenuPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CombatMenuPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombatMenuPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
