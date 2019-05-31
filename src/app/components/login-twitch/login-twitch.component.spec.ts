import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTwitchComponent } from './login-twitch.component';

describe('LoginTwitchComponent', () => {
  let component: LoginTwitchComponent;
  let fixture: ComponentFixture<LoginTwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
