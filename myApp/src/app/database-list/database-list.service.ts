import { Injectable } from '@angular/core';
import { Database } from './database';
import { DATABASES } from './mock-database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseListService {
  constructor() {}

  getDatabases(): Database[] {
    return DATABASES;
  }
}
