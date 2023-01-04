import { Component, OnInit } from '@angular/core';
import { Database } from './database';
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
  };
  databases = DATABASES;
  cat = {
    id: 1,
    name: 'cats',
  };
  selectedDatabase?: Database;

  constructor() {}

  ngOnInit(): void {
    this.cat = {
      id: 2,
      name: 'catsss',
    };
  }
  onSelect(database: Database): void {
    this.selectedDatabase = database;
  }
}
