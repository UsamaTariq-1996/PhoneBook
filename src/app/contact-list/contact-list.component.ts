import {
  Component,
  OnInit,
  ɵCodegenComponentFactoryResolver,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contactName: string;
  contactMsg: string;
  contactNo: string;
  contacts: any[] = [];
  updateState: boolean = false;
  updateId: string;
  deleteId: string;
  constructor(private router: Router) {
    this.contacts = []
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contacts = JSON.parse(localStorage.getItem('contacts'));
  }
  getContactsAfterAction() {
    this.contacts = JSON.parse(localStorage.getItem('contacts'));
  }
  addContact() {
    let contacts = [];
    contacts = JSON.parse(localStorage.getItem('contacts'));
    let newContact = {
      id: this.createId(),
      contactName: this.contactName,
      contactNo: this.contactNo,
    };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.contactName = "";
    this.contactNo = null;
    this.getContactsAfterAction();
  }
  reset() {
    this.contactName = '';
    this.contactNo = null;
    this.updateState = false;
  }
  editContact(item) {
    console.log(item, 'clicked item');
    this.contactName = item.contactName;
    this.contactNo = item.contactNo;
    this.updateId = item.id;
    this.updateState = true;
  }

  updateContact() {
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id == this.updateId) {
        contacts[i].contactName = this.contactName;
        contacts[i].contactNo = this.contactNo;
      }
    }
    console.log(contacts);

    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.contactName = "";
    this.contactNo = null;
    this.updateState = false;
    this.getContactsAfterAction();
  }

  deleteContact(item) {
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    this.deleteId = item.id;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id == this.deleteId) {
        contacts.splice(i, 1);
      }
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.getContactsAfterAction();
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  logout() {
    this.router.navigateByUrl('');
  }
}
