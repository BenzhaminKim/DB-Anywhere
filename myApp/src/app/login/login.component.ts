import { Component, OnInit, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeaderService } from '../header/header.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public loginService: LoginService) {}
  ngOnInit(): void {}
}
