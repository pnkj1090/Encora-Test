import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Contact, URLS } from 'src/constants';

@Component({
  selector: 'app-contacted-person',
  templateUrl: './contacted-person.component.html',
  styleUrls: ['./contacted-person.component.css']
})
export class ContactedPersonComponent implements OnInit {

  /************************* 
   * 
   NOTE: I have implemented all of the functionalities but there are some limitations
          like, you cant update/delete the latest entry, unable to reflect updated values on the view etc.
          because updated values are not persisted on the server.

  **************************/

  contactList: Array<Contact> = [];
  contactForm: FormGroup = new FormGroup({});
  modalTitle: string = '';
  contactId: string = '';

  constructor(
    // private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.createContactForm();
    const userData = JSON.parse(localStorage.userDetails);
    this.httpClient.get<Array<Contact>>(URLS.contacts)
      .subscribe(contactsList => {
        this.contactList = contactsList;
      })
  }

  createContactForm(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)])
    })
  }

  submitPersonData(formData: FormGroup): void {
    if (this.contactId) {
      this.httpClient.put<Contact>(`${URLS.contacts}/${this.contactId}`, formData.value)
        .subscribe(data => {
          // unable to refelct updated values because updated values are not persisted on server.
          this.modalService.dismissAll();
          this.toaster.success('Updated Successfully')
        })
    }
    else {
      this.httpClient.post<Contact>(URLS.contacts, formData.value)
        .subscribe(data => {
          this.modalService.dismissAll();
          this.toaster.success('Added Successfully')
          this.contactList.push(data);
        });
    }
  }

  openModal(modal: any, title: string, formValue?: Contact): void {
    this.modalService.open(modal);
    this.modalTitle = title;
    if (formValue) {
      this.contactForm.patchValue(formValue);
      this.contactId = formValue.id;
    } else {
      this.contactId = '';
      this.contactForm.reset();
    }
  }

  deleteContact(id: string): void {
    let confirmation = confirm('Are you sure you want to delete?');
    if (confirmation) {
      this.httpClient.delete(`${URLS.contacts}/${id}`).subscribe((data) => {
        this.toaster.success('Deleted Successfully');
        this.contactList = this.contactList.filter((contact: Contact) => contact.id !== id);
      })
    }
  }

}
