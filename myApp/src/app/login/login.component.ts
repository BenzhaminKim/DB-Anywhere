import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    if (this.loginService.isLoggedIn() == true) {
      this.router.navigate(['/databases']);
    }
  }

  login(): void {
    console.log(this.loginForm.value);
    this.loginService.request_login(
      this.loginForm.value.email as string,
      this.loginForm.value.password as string
    );
    console.log(this.cookieService.getAll());
    this.router.navigate(['/databases']);
  }
}
