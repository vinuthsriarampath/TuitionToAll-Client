/*
 * Copyright (c) 2025 vinuth sri arampath
 *
 * This code is the intellectual property of vinuth sri arampath and is protected under copyright law.
 * Unauthorized copying, modification, distribution, or use of this code, in whole or in part,
 * without prior written permission is strictly prohibited.
 *
 * Portions of this code may be generated with AI and modified by vinuth sri arampath
 * All rights reserved.
 */

import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  StudentRegistrationRequest
} from '../../dtos/request/registration/sub-registration-dto/student-registration-request';
import {
  InstituteRegistrationRequest
} from '../../dtos/request/registration/sub-registration-dto/institute-registration-request';
import {
  TeacherRegistrationRequest
} from '../../dtos/request/registration/sub-registration-dto/teacher-registration-request';
import {CommonModule, NgClass} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {ApiResponse} from '@shared/utils/response/api-response';
import {Teacher} from '../../../profile/dtos/response/teacher';
import {Institute} from '../../../profile/dtos/response/institute';
import {Student} from '../../../profile/dtos/response/student';
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Lock,
  LucideAngularModule,
  Mail,
  MapPin,
  Phone,
  User,
  UserPlus,
  X
} from 'lucide-angular';
import {CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    CommonModule,
    RouterLink,
    LucideAngularModule,
    CardShellComponent
  ],
  templateUrl: './signup-page.component.html'
})
export class SignupPageComponent {
  signupRequest: any = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    instituteName: '',
    address: '',
    email: '',
    contactNo: '',
    password: ''
  };
  confirmPassword: string = '';
  userType: string = 'student';
  step: number = 1;
  errorMessage?: string = '';
  successMessage?: string = '';
  isLoading: boolean = false;

  studentRegistrationRequest: StudentRegistrationRequest = {};
  teacherRegistrationRequest: TeacherRegistrationRequest = {};
  instituteRegistrationRequest: InstituteRegistrationRequest = {};

  constructor(private readonly authService:AuthenticationService, private readonly router:Router){}

  setUserType(type: string) {
    this.userType = type;
  }

  nextStep() {
    if (this.step === 1) {
      if (this.userType) {
        this.step++;
      } else {
        this.errorMessage = 'Please select a user type.';
      }
    } else if (this.step === 2) {
      if (this.isStep2Valid()) {
        this.step++;
      } else {
        this.errorMessage = 'Please fill in all required fields.';
      }
    } else if (this.step === 3) {
      if (this.isStep3Valid()) {
        this.register();
      } else {
        this.errorMessage = 'Please fill in all required fields and ensure passwords match.';
      }
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
      this.errorMessage = '';
      if(this.isLoading){
        this.isLoading = false;
      }
    }
  }

  isStep2Valid(): boolean {
    if (this.userType === 'institute') {
      return !!this.signupRequest.instituteName && !!this.signupRequest.address && !!this.signupRequest.contactNo;
    } else {
      return !!this.signupRequest.firstName && !!this.signupRequest.lastName && !!this.signupRequest.dateOfBirth && !!this.signupRequest.address && !!this.signupRequest.contactNo;
    }
  }

  isStep3Valid(): boolean {
    return !!this.signupRequest.email && !!this.signupRequest.password && (this.signupRequest.password === this.confirmPassword) ;
  }

  register() {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.userType === 'student') {
      this.studentRegistrationRequest = {
        firstName: this.signupRequest.firstName,
        lastName: this.signupRequest.lastName,
        dob: this.signupRequest.dateOfBirth,
        address: this.signupRequest.address,
        contact: this.signupRequest.contactNo,
        email: this.signupRequest.email,
        password: this.signupRequest.password
      };
      this.authService.registerStudent(this.studentRegistrationRequest).subscribe({
        next:async (response:ApiResponse<Student>) => {
          if (response) {
            this.successMessage = `${response.message}, you will navigate to the login page soon.`;
            this.clearFields();
            this.hideAlertAfterDelay().then(() => {
              this.router.navigate(['/auth/login']);
            });
          } else {
            this.isLoading = false;
            this.errorMessage = 'Something went wrong!';
            await this.hideAlertAfterDelay();
          }
        },
        error:(error) =>{
          this.isLoading = false;
          this.errorMessage=error.error.message;
          this.hideAlertAfterDelay();
        }
      })
    } else if (this.userType === 'teacher') {
      this.teacherRegistrationRequest = {
        firstName: this.signupRequest.firstName,
        lastName: this.signupRequest.lastName,
        dob: this.signupRequest.dateOfBirth,
        address: this.signupRequest.address,
        contact: this.signupRequest.contactNo,
        email: this.signupRequest.email,
        password: this.signupRequest.password
      };
      this.authService.registerTeacher(this.teacherRegistrationRequest).subscribe({
        next: (response: ApiResponse<Teacher>) => {
          if (response) {
            this.successMessage = response.message + ", you will navigate to login page soon..";
            this.clearFields();
            this.hideAlertAfterDelay().then(() => {
              this.router.navigate(['/auth/login']);
            });
          } else {
            this.isLoading = false;
            this.errorMessage = 'Something Went Wrong!!';
            this.hideAlertAfterDelay();
          }
        },
        error:(error) =>{
          this.isLoading = false;
          this.errorMessage=error.error.message;
          this.hideAlertAfterDelay();
        }
      })
    } else if (this.userType === 'institute') {
      this.instituteRegistrationRequest = {
        instituteName: this.signupRequest.instituteName,
        address: this.signupRequest.address,
        contact: this.signupRequest.contactNo,
        email: this.signupRequest.email,
        password: this.signupRequest.password
      };
      this.authService.registerInstitute(this.instituteRegistrationRequest).subscribe({
        next:async (response:ApiResponse<Institute>) =>{
          if(response){
            this.successMessage=response.message+", you will navigate to login page soon..";
            this.clearFields();
            this.hideAlertAfterDelay().then(() => {
              this.router.navigate(['/auth/login']);
            });
          }else{
            this.isLoading = false;
            this.errorMessage = 'Something Went Wrong!!';
            await this.hideAlertAfterDelay();
          }
        },
        error:(error) =>{
          this.isLoading = false;
          this.errorMessage=error.error.message;
          this.hideAlertAfterDelay();
        }
      })
    }
  }

  clearFields() {
    this.userType = 'student';
    this.step = 1;
    this.signupRequest = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      instituteName: '',
      address: '',
      email: '',
      contactNo: '',
      password: ''
    };
    this.confirmPassword = '';
    this.errorMessage = '';
    this.isLoading = false;
  }

  hideAlertAfterDelay():Promise<void> {
    return new Promise((resolve)=>{
      setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
      resolve();
    }, 5000);
    })
  }

  protected readonly Loader2 = Loader2;
  protected readonly ArrowRight = ArrowRight;
  protected readonly X = X;
  protected readonly Lock = Lock;
  protected readonly Mail = Mail;
  protected readonly Phone = Phone;
  protected readonly MapPin = MapPin;
  protected readonly Building2 = Building2;
  protected readonly Calendar = Calendar;
  protected readonly User = User;
  protected readonly Briefcase = Briefcase;
  protected readonly CheckCircle2 = CheckCircle2;
  protected readonly AlertCircle = AlertCircle;
  protected readonly Check = Check;
  protected readonly UserPlus = UserPlus;
  protected readonly GraduationCap = GraduationCap;
}
