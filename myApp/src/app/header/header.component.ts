import {
  AfterContentInit,
  AfterViewChecked,
  Component,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import { LoginService } from '../login/login.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck {
  isLoggedIn: boolean = false;
  constructor(
    public headerService: HeaderService,
    public loginService: LoginService
  ) {}
  ngOnInit(): void {}
  ngDoCheck(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
  }
  logOut(): void {
    this.loginService.logOut();
  }
}
