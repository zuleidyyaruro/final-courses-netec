import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private http: HttpClient = inject(HttpClient);
  private baseUri: string = 'http://localhost:8084/course';

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUri)
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Error'))
        })
      )
  }

}
