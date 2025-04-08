import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullDownToRefreshComponent } from './pull-down-to-refresh.component';

describe('PullDownToRefreshComponent', () => {
  let component: PullDownToRefreshComponent;
  let fixture: ComponentFixture<PullDownToRefreshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PullDownToRefreshComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PullDownToRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
