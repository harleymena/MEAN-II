import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [ EmployeeService ]
})
export class EmployeeComponent implements OnInit {

  empleados:Employee[];
  empleado:Employee=new Employee();

  constructor(private employeeService: EmployeeService) {
    this.getEmployees();
  }

  ngOnInit() {}

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.empleados = res as Employee[];
      });
  }

  addEmployee(form?: NgForm) {
    this.empleado=form.value;
    if(this.empleado.name===''||this.empleado.position===''||this.empleado.office===''){
      M.toast({html: 'Save Not Allowed'});
    }else{
      if(this.empleado._id!="") {
        //Actualizacion de datos
        this.employeeService.putEmployee(this.empleado)
          .subscribe(res => {
            this.resetForm(form);
            this.getEmployees();
            M.toast({html: 'Updated Successfully'});
          });
      } else {
        //Alta de datos
        this.empleado._id=null;
        this.employeeService.postEmployee(this.empleado)
        .subscribe(res => {
          this.getEmployees();
          this.resetForm(form);
          M.toast({html: 'Save Succesfully'});
        });
      }
    }
  }

  editEmployee(employee: Employee) {
    this.empleado = employee;
  }

  deleteEmployee(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          this.getEmployees();
          this.resetForm(form);
          M.toast({html: 'Deleted Succesfully'});
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.empleado = new Employee();
    }
  }

}
