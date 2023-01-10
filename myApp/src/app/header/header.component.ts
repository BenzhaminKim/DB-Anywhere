import { Component, Input, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() headerName!: string;
  constructor(public headerService: HeaderService) {}
  ngOnInit(): void {}
}
