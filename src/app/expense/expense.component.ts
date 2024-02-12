import { Component } from '@angular/core';
import { Expense } from '../models/expense';
import { ExpenseService } from '../service/expense.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent {
  expenseArray: Expense[] = [];
  expenseFormGroup!: FormGroup;
  constructor(private expenseService: ExpenseService, private fb: FormBuilder) {
    this.expenseFormGroup = this.fb.group({
      _id: [''],
      expenseType: [''],
      expenserName: [''],
      amount: [''],
    });
  }

  ngOnInit() {
    this.getExpenseList();
  }

  getExpenseList() {
    this.expenseService.getExpense().subscribe((response) => {
      console.log(response);

      this.expenseArray = response;
    });
  }

  onSubmit() {
    console.log(this.expenseFormGroup.value);

    if (
      this.expenseFormGroup.value._id != null &&
      this.expenseFormGroup.value._id != ''
    ) {
      this.expenseService
        .updateExpense(this.expenseFormGroup.value)
        .subscribe((response) => {
          this.getExpenseList();
          this.expenseFormGroup.setValue({
            _id: [''],
            expenseType: [''],
            expenserName: [''],
            amount: [''],
          });
        });
    } else {
      this.expenseService
        .createExpense(this.expenseFormGroup.value)
        .subscribe((res) => {
          this.getExpenseList();
          this.expenseFormGroup.setValue({
            _id: [''],
            expenseType: [''],
            expenserName: [''],
            amount: [''],
          });
        });
    }
  }

  fillForm(expensor: Expense) {
    console.log(expensor);
    this.expenseFormGroup.patchValue({
      _id: expensor._id,
      expenseType: expensor.expenseType,
      expenserName: expensor.expenserName,
      amount: expensor.amount,
    });
  }

  deleteExpensor(expensor: Expense) {
    var confirmDelete = confirm(
      'Are you sure delete : ' + expensor.expenserName
    );
    if (confirmDelete) {
      var data = {
        _id: expensor._id,
        expenseType: expensor.expenseType,
        expenserName: expensor.expenserName,
        amount: expensor.amount,
        isDelete: true,
      };
      this.expenseService.deleteExpense(data).subscribe((res) => {
        this.getExpenseList();
      });
    }
  }
}
