import { Component } from '@angular/core';
import { Member } from '../models/member';
import { MemberService } from '../service/member.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
  providers: [MemberService]
})
export class MemberComponent {
  memberArray: Member[] = [];
  memberFormGroup!: FormGroup;

  imageData!: any;
  constructor(private mService: MemberService, private fb: FormBuilder) {
    this.memberFormGroup = this.fb.group({
      _id: [''],
      name: [''],
      address: [''],
      avatar: [''],
      dob: [''],
      phoneno: [''],
    });
  }

  getMembersAll(){
    this.mService.getMemberList().subscribe(res =>{
      this.memberArray = res;  
       
    })
   
    
  }

  ngOnInit(){
    this.getMembersAll();
  }
  selectImage(event:any){
    if(event.target.files.length>0){
      const file:File = event.target.files[0];
      this.imageData =file;
      this.memberFormGroup.value.avatar = this.imageData;
      console.log(this.memberFormGroup.value.avatar);
    }
    
  }

  onSubmit(){
    if (
      this.memberFormGroup.value._id != null &&
      this.memberFormGroup.value._id != ''
    ) {
      const formData = new FormData();      
  formData.append('_id',this.memberFormGroup.value._id);
  formData.append('avatar',this.imageData);
  formData.append('name',this.memberFormGroup.value.name);
  formData.append('phoneno',this.memberFormGroup.value.phoneno);
  formData.append('address',this.memberFormGroup.value.address);
  formData.append('dob',this.memberFormGroup.value.dob);
  this.mService.updateMember(formData).subscribe(res=>{
    this.getMembersAll();
    this.memberFormGroup.setValue({
      _id: '',
      name: '',
      phoneno: '',
      address: '',
      avatar: '',
      dob: '',
    });
  })
    }
    else{
      const formData = new FormData();
  formData.append('avatar',this.memberFormGroup.value.avatar);
  formData.append('name',this.memberFormGroup.value.name);
  formData.append('phoneno',this.memberFormGroup.value.phoneno);
  formData.append('address',this.memberFormGroup.value.address);
  formData.append('dob',this.memberFormGroup.value.dob);
  console.log(formData);
  
      this.mService.createMember(formData).subscribe(res =>{
        this.getMembersAll();
        this.memberFormGroup.setValue({
          _id: '',
          name: '',
          phoneno: '',
          address: '',
          avatar: '',
          dob: '',
        });
      })
    }
  }

  onModalHidden(): void {
    // Clear the form when the modal is hidden
    this.memberFormGroup.reset();
  }
  fillForm(member:Member){
    
this.memberFormGroup.patchValue({
  _id: member._id,
            name: member.name,
            phoneno: member.phoneno,
            address: member.address,
            dob: member.dob,
            avatar: member.avatar,
            
})
  }

  deletemember(id:string){
    var confirmDelete = confirm('Are you sure delete this data');
    if (confirmDelete) {
      this.mService.deleteMember(id).subscribe((res) => {
        this.getMembersAll();
      });
    }
  }
}
