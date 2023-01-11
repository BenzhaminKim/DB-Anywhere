import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Database } from './database';
import { DatabaseListService } from './database-list.service';
import { DATABASES } from './mock-database';

@Component({
  selector: 'app-database-list',
  templateUrl: './database-list.component.html',
  styleUrls: ['./database-list.component.css'],
})
export class DatabaseListComponent implements OnInit {
  database: Database = {
    id: 1,
    name: 'db1',
    status: 'ready',
    type: 'postgres',
    created_at: '2022-09-01',
  };
  databases: Database[] = [];
  cat = {
    id: 1,
    name: 'cats',
  };
  selectedDatabase?: Database;

  constructor(
    private databaseListService: DatabaseListService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.cat = {
      id: 2,
      name: 'catsss',
    };
    this.getDatabases();

    console.log(this.cookieService.getAll());
  }
  getDatabases(): void {
    this.databases = this.databaseListService.getDatabases();
  }
  onSelect(database: Database): void {
    this.selectedDatabase = database;
  }
}
