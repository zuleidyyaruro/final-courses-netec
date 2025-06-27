import { Component, inject, signal, OnInit, TemplateRef, WritableSignal } from '@angular/core';
import { CardDashboard, Course } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
import { NgbModal, ModalDismissReasons, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NgbDatepickerModule]
})
export class DashboardComponent implements OnInit {

  private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');

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

  open(content: TemplateRef<any>, hola:string) {
    console.log(hola)
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}
