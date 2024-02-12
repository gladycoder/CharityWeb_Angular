import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {}
  baseUrl = "http://localhost:5000/api/members";
  createMemberUrl = "http://localhost:5000/api/memberCreate";
  updateMemberUrl = "http://localhost:5000/api/memberUpdate";
  deleteMemberUrl = "http://localhost:5000/api/memberDelete";


  getMemberList():Observable<Member[]>{
    return this.http.get<Member[]>(this.baseUrl);
  }

  createMember(member: any):Observable<any>{
    member._id="000";
    return this.http.post<any>(this.createMemberUrl,member);
  }

  updateMember(member: any): Observable<any> {
    return this.http.put<any>(
      this.updateMemberUrl + '/' + member._id,
      member
    );
  }
  
  deleteMember(_id: string): Observable<Member> {
    return this.http.delete<Member>(this.deleteMemberUrl + '/' + _id);
  }
}
