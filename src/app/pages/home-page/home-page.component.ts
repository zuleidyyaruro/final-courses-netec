import { Component, OnInit } from '@angular/core';
import { Card } from '../../interfaces/course.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class HomePageComponent {

  cards: Card[] = [
    {
      title: 'Cursos actualizados',
      description: 'Contenido alineado a las últimas tendencias y tecnologías.',
    },
    {
      title: 'Instructores expertos',
      description: 'Aprende de profesionales con experiencia en la industria.',
    },
    {
      title: 'Acceso a recursos exclusivos',
      description: 'Materiales, herramientas y guías para potenciar tu aprendizaje.',
    }
  ]

}
