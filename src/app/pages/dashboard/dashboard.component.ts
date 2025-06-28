import { Component, inject, signal, OnInit, TemplateRef, WritableSignal } from '@angular/core';
import { CardDashboard, Course } from '../../interfaces/course.interface';
import { CoursesService } from '../../services/courses.service';
import { NgbModal, ModalDismissReasons, NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    NgbDatepickerModule,
    NgbTooltipModule,
    ReactiveFormsModule,
  ]
})
export class DashboardComponent implements OnInit {

  private service: CoursesService = inject(CoursesService);
  private builder: FormBuilder = inject(FormBuilder);
  private modalService = inject(NgbModal);

  course = signal({
    id: 0,
    name: "",
    description: "",
    duration: "",
    level: "",
    price: 0
  })


  modalHeaderTitle = signal('')
  closeResult: WritableSignal<string> = signal('');
  courses = signal<Course[]>([])

  form = this.builder.group({
    id: [0],
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    duration: ['', Validators.required],
    level: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]]
  });


  ngOnInit() {
    this.getCourses();
  }

  buildForm(course: Course) {
    this.form.patchValue(course)
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
        this.save()
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }

  save() {
    const title = this.modalHeaderTitle();
    if (title.includes('Editar')) {
      this.service.updateCourse(this.form.value as Course).subscribe({
        next: (response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "El curso ha sido actualizado",
            showConfirmButton: false,
            timer: 1500
          });
          this.getCourses();
        },
        error: error => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Algo salió mal!",
            showConfirmButton: false,
            timer: 1500
          });
          console.log(error);
        }
      });
    } else {
      this.service.createCourse(this.form.value as Course).subscribe({
        next: (response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "El curso ha sido creado",
            showConfirmButton: false,
            timer: 1500
          });
          this.getCourses();
        },
        error: error => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Algo salió mal!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }

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

  deleteCourse(id: number) {

    Swal.fire({
      title: "Realmente quieres eliminar este curso?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar curso",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCourse(id).subscribe({
          next: (response) => {
            Swal.fire({
              title: "Eliminado!",
              text: "Los datos del curso han sido eliminados.",
              icon: "success"
            });
            this.getCourses();
          },
          error: error => console.log(error)
        });
      }
    });

  }

}
