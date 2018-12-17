export class Employee {

  _id: string;
  name: string;
  position: string;
  office: string;
  salary: number;

  constructor(_id = '', name = '', position = '', office = '', salary = 0) {
      this._id = _id;
      this.name = name;
      this.position = position;
      this.office = office;
      this.salary = salary;
  }
}
