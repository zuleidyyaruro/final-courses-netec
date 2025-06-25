import { Component, inject, signal, OnInit } from '@angular/core';
import { CardDashboard, Course } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cards: CardDashboard[] = [
    {
      card: {
        title: 'Usuarios',
        description: 'Ver, editar y eliminar usuarios registrados',
      },
      textButton: 'Administrar usuarios'
    },
    {
      card: {
        title: 'Cursos',
        description: 'Agregar y modificar cursos disponibles',
      },
      textButton: 'Administrar cursos'
    },
    {
      card: {
        title: 'Reportes',
        description: 'Estadísticas de acceso y rendimiento',
      },
      textButton: 'Ver reportes'
    }
  ];

  courses = signal<Course[]>([])

  private service: CoursesService = inject(CoursesService);

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.service.getCourses().subscribe({
      next: values => this.courses.set(values),
      error: error => console.log(error)
    })
  }

}
