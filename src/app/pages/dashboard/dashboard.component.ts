import { Component, inject, signal, OnInit, TemplateRef, WritableSignal } from '@angular/core';
import { CardDashboard, Course } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';
import { NgbModal, ModalDismissReasons, NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NgbDatepickerModule, NgbTooltipModule]
})
export class DashboardComponent implements OnInit {

  private service: CoursesService = inject(CoursesService);
  private build = inject(FormBuilder)
  private modalService = inject(NgbModal);

  course = signal({
    id: 0,
    name: "",
    description: "",
    duration: "",
    level: "",
    price: 0
  })

  form: WritableSignal<FormGroup> = signal(this.build.group(this.course()));
  modalHeaderTitle = signal('')
  closeResult: WritableSignal<string> = signal('');
  courses = signal<Course[]>([])


  ngOnInit() {
    this.getCourses();

  }

  buildForm(course: Course) {
    this.form.set({
      id: [course.id],
      name: [course.name],
      description: [course.description],
      duration: [course.duration],
      level: [course.level],
      price: [course.price]
    })
  }

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

  getCourses() {
    this.service.getCourses().subscribe({
      next: values => this.courses.set(values),
      error: error => console.log(error)
    })
  }

  open(content: TemplateRef<any>, course: Course) {
    this.buildForm(course);
    if (course.id) {
      this.modalHeaderTitle.set('Editar datos del curso')
    } else {
      this.modalHeaderTitle.set('Crear un curso')
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).result.then(
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
