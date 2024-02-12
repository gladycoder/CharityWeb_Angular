import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:5000/api/expenseFetch';
  createExpenseUrl = 'http://localhost:5000/api/expenseCreate';
  updateExpenseUrl = 'http://localhost:5000/api/expenseUpdate';

  getExpense(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseUrl);
  }

  createExpense(expenser: Expense): Observable<Expense> {
    expenser._id = '0000';
    return this.http.post<Expense>(this.createExpenseUrl, expenser);
  }

  updateExpense(expenser: Expense): Observable<Expense> {
    return this.http.put<Expense>(
      this.updateExpenseUrl + '/' + expenser._id,
      expenser
    );
  }

  deleteExpense(expenser: Expense): Observable<Expense> {
    return this.http.put<Expense>(
      this.updateExpenseUrl + '/' + expenser._id,
      expenser
    );
  }
}
