import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalsUiComponent } from './arrivals-ui.component';

describe('ArrivalsUiComponent', () => {
  let component: ArrivalsUiComponent;
  let fixture: ComponentFixture<ArrivalsUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ArrivalsUiComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivalsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
