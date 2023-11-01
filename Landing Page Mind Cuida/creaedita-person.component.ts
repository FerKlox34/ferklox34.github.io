import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Person } from 'src/app/model/person';
import { PersonService } from 'src/app/service/person.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
@Component({
  selector: 'app-creaedita-person',
  templateUrl: './creaedita-person.component.html',
  styleUrls: ['./creaedita-person.component.css'],
})
export class CreaeditaPersonComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  persona: Person = new Person();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  birthDatePerson = new FormControl(new Date());
  id: number = 0;
  edicion: boolean = false;


  constructor(
    private cS: PersonService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idPerson: ['',],
      namePerson: ['', Validators.required],
      genderPerson: ['', Validators.required],
      emailPerson: ['', [Validators.required, Validators.email]],
      birthDatePerson: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.persona.mbidMedicine = this.form.value.mbidMedicine;
      this.persona.mbnameMedicine = this.form.value.mbnameMedicine;
      this.persona.mbdescriptionMedicine = this.form.value.mbdescriptionMedicine;
      this.persona.mbmanufacturingDateMedicine = this.form.value.mbmanufacturingDateMedicine;
      this.persona.mbquantityMedicine = this.form.value.mbquantityMedicine;
      this.persona.mbpriceMedicine = this.form.value.mbpriceMedicine;
      if (this.edicion) {
        this.cS.update(this.persona).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.persona).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['personas']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          mbidMedicine: new FormControl(data.mbidMedicine),
          mbnameMedicine: new FormControl(data.mbnameMedicine),
          mbdescriptionMedicine:new FormControl(data.mbdescriptionMedicine),
          mbmanufacturingDateMedicine: new FormControl(data.mbmanufacturingDateMedicine),
          mbquantityMedicine: new FormControl(data.mbquantityMedicine),
          mbpriceMedicine: new FormControl(data.mbpriceMedicine),
        });
      });
    }
  }
}
