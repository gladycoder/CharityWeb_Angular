import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Dontaion } from '../models/donation';
import { DonationService } from '../service/donation.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent {
  donationArray: Dontaion[] = [];

  donationFormGroup!: FormGroup;
  createFormGroup!: FormGroup;
  constructor(private dService: DonationService, private fb: FormBuilder) {
    this.donationFormGroup = this.fb.group({
      _id: [''],
      name: [''],
      address: [''],
      amount: [''],
      buyer: [''],
      phoneno: [''],
    });
  }

  ngOnInit() {
    this.getDonationList();
  }

  getDonationList() {
    this.dService.getDonation().subscribe((response) => {
      console.log(response);

      this.donationArray = response;
    });
  }

  onSubmit() {
    console.log(this.donationFormGroup.value);

    if (
      this.donationFormGroup.value._id != null &&
      this.donationFormGroup.value._id != ''
    ) {
      this.dService
        .updateDonation(this.donationFormGroup.value)
        .subscribe((response) => {
          this.getDonationList();
          this.donationFormGroup.setValue({
            _id: '',
            name: '',
            phoneno: '',
            address: '',
            buyer: '',
            amount: '',
          });
        });
    } else {
      this.dService
        .createDonation(this.donationFormGroup.value)
        .subscribe((response) => {
          this.getDonationList();
          this.donationFormGroup.setValue({
            _id: '',
            name: '',
            phoneno: '',
            address: '',
            buyer: '',
            amount: '',
          });
        });
    }
  }

  fillForm(donator: Dontaion) {
    console.log(donator);
    this.donationFormGroup.patchValue({
      _id: donator._id,
      name: donator.name,
      phoneno: donator.phoneno,
      address: donator.address,
      buyer: donator.buyer,
      amount: donator.amount,
    });
  }

  deleteDonator(id: string) {
    console.log(id);
    var confirmDelete = confirm('Are you sure delete this data');
    if (confirmDelete) {
      this.dService.deleteDonation(id).subscribe((res) => {
        this.getDonationList();
      });
    }
  }
}
