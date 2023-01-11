import { Injectable } from '@angular/core';
import { Database } from './database';
import { DATABASES } from './mock-database';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatabaseListService {
  constructor(private httpClient: HttpClient) {}

  getDatabases(): Database[] {
    this.httpClient.get("")
    return DATABASES;
  }
}
