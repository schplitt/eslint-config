import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

// Service without providedIn
@Injectable()
export class ExampleService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('/api/data')
  }
}

// Good: Service with providedIn
@Injectable({ providedIn: 'root' })
export class GoodService {
  private readonly http = inject(HttpClient)

  getData() {
    return this.http.get('/api/data')
  }
}

import { inject } from '@angular/core'
