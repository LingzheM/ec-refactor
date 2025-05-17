import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    auth = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should disable submit when form is invalid', () => {
    component.form.setValue({ username: '', password: '' });
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.disabled).toBeTrue();
  });

  it('should navigate on successful login', fakeAsync(() => {
    component.form.setValue({ username: 'test', password: '123456' });
    auth.login.and.returnValue(of(true).pipe());
    component.onSubmit();
    tick();
    expect(auth.login).toHaveBeenCalledWith('test', '123456');
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  }));

  it('should alert on failed login', fakeAsync(() => {
    spyOn(window, 'alert');
    component.form.setValue({ username: 'x', password: 'y' });
    auth.login.and.returnValue(throwError(() => new Error('fail')));
    component.onSubmit();
    tick();
    expect(window.alert).toHaveBeenCalledWith('fail');
  }))
});
