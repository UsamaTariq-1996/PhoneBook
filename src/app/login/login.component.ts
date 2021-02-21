import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string;
  password:string;
  invalidUser: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    if(this.userName === "Usama" && this.password === "123"){
      console.log("Valid");
      this.router.navigateByUrl("/ContactList");
    }else{
      console.log("Invalid");
      this.invalidUser = true;
    }
  }

}
