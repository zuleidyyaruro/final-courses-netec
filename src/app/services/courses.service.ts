import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private http: HttpClient = inject(HttpClient);
  private baseUri: string = '/api/course';

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUri)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Error'))
        })
      )
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUri, course)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Error'))
        })
      )
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(this.baseUri, course)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Error'))
        })
      )
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUri}/${id}`)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Error'))
        })
      )
  }

}
