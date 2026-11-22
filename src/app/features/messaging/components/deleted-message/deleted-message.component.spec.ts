import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedMessageComponent } from './deleted-message.component';

describe('DeletedMessageComponent', () => {
  let component: DeletedMessageComponent;
  let fixture: ComponentFixture<DeletedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
