import { Component, OnInit } from '@angular/core';
import { GetEmployeesService } from "../get-employees.service";
import { Employee } from './employeeInterface';

@Component({
    selector: 'app-tabella',
    templateUrl: './tabella.component.html',
    styleUrls: ['./tabella.component.css']
})

export class TabellaComponent
{
    id: number;
    ges : GetEmployeesService; 
    array : Employee[]; 
    idCanc: number[] = [];

    constructor(ges : GetEmployeesService) 
    {
        this.id = 0;
        this.ges = ges;
        this.array = [];
        this.load();
        
    }

    load() : void 
    {
        this.ges.getData("http://localhost:4200/api/tutorial/1.0/employees").subscribe(data => this.array = data);
    }

    remove(id : number) : void
    {
        this.ges.deleteData("http://localhost:4200/api/tutorial/1.0/employees/" + id).subscribe(data => this.load());
    }

    add(firstName : string, lastName : string, email : string, phone : string) : void
    {
        let emp : Employee = { 
			      employeeId: this.generaID(),
			      firstName: firstName,
			      lastName: lastName,
			      email: email,
			      phone: phone
		};
        this.ges.postData("http://localhost:4200/api/tutorial/1.0/employees", emp).subscribe(data => this.load());
    }

    modify(id : number, firstName : string, lastName : string, email : string, phone : string) : void
    {
        let emp : Employee = {
			employeeId: id,
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone
		};

        this.ges.putData("http://localhost:4200/api/tutorial/1.0/employees/" + id, emp).subscribe(data => this.load());
    }

    

    message(message : string) : any 
    {
        return window.prompt(message);
    }

    private generaID() : number 
    {
        return this.id++;
    }
}