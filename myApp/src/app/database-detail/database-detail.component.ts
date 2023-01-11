import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Database } from '../database-list/database';
import { DATABASES } from '../database-list/mock-database';

@Component({
  selector: 'app-database-detail',
  templateUrl: './database-detail.component.html',
  styleUrls: ['./database-detail.component.css'],
})
export class DatabaseDetailComponent implements OnInit {
  database!: Database;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const database_id = Number(this.route.snapshot.paramMap.get('id'));
    this.database =
      DATABASES.find(({ id }) => id === database_id) || DATABASES[0];
  }
}
