import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AttendanceRecord {
  id: number;
  name: string;
  sanctionedStrength: number;
  admittedStrength: number;
  studentRegistered: number;
  studentMarked: number;
  percentage: number;
}

export interface EmployeeRecord {
  id: number;
  name: string;
  totalEmployees: number;
  employeesRegistered: number;
  markedAttendance: number;
  present: number;
  absent: number;
  late: number;
}

export interface Statistics {
  totalUnits: number;
  totalStudents: number;
  overallAttendance: number;
  unitLabel: string;
}

export interface PrincipalAttendance {
  id: number;
  schoolName: string;
  schoolCode: string;
  principal: string;
  present: boolean;
  absent: boolean;
  late: boolean;
}

export interface ClassAttendance {
  id: number;
  class: string;
  totalSanctionedStrength: number;
  admittedStrength: number;
  studentsRegistered: number;
  studentsMarkedAttendance: number;
  percentageAttendance: number;
}

export interface EmployeeAttendanceRecord {
  id: number;
  employeeName: string;
  designation: string;
  checkInTime: string;
  checkOutTime: string;
  status: 'Present' | 'Absent' | 'Late';
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private currentLevel = new BehaviorSubject<string>('state');
  currentLevel$ = this.currentLevel.asObservable();

  private selectedDistrict = new BehaviorSubject<string>('');
  selectedDistrict$ = this.selectedDistrict.asObservable();

  private selectedSchool = new BehaviorSubject<string>('');
  selectedSchool$ = this.selectedSchool.asObservable();

  private stateData = {
    attendance: [
      { id: 1, name: 'Delhi', sanctionedStrength: 65000, admittedStrength: 61500, studentRegistered: 60000, studentMarked: 57500, percentage: 95.8 },
      { id: 2, name: 'Mumbai', sanctionedStrength: 45000, admittedStrength: 43000, studentRegistered: 42500, studentMarked: 39900, percentage: 93.9 },
      { id: 3, name: 'Bangalore', sanctionedStrength: 35000, admittedStrength: 33500, studentRegistered: 32000, studentMarked: 31100, percentage: 97.2 },
      { id: 4, name: 'Chennai', sanctionedStrength: 28000, admittedStrength: 26500, studentRegistered: 25000, studentMarked: 23800, percentage: 95.2 }
    ],
    employees: [
      { id: 1, name: 'Delhi', totalEmployees: 2850, employeesRegistered: 2800, markedAttendance: 2750, present: 2650, absent: 85, late: 15 },
      { id: 2, name: 'Mumbai', totalEmployees: 2200, employeesRegistered: 2180, markedAttendance: 2150, present: 2050, absent: 85, late: 15 },
      { id: 3, name: 'Bangalore', totalEmployees: 1950, employeesRegistered: 1920, markedAttendance: 1890, present: 1820, absent: 55, late: 15 },
      { id: 4, name: 'Chennai', totalEmployees: 1800, employeesRegistered: 1780, markedAttendance: 1750, present: 1680, absent: 55, late: 15 }
    ],
    statistics: { totalUnits: 4, totalStudents: 149200, overallAttendance: 94.6, unitLabel: 'Districts' }
  };

  private districtData = {
    attendance: [
      { id: 1, name: 'GHS001 - Govt High School', schoolCode: 'GHS001', sanctionedStrength: 250, admittedStrength: 235, studentRegistered: 230, studentMarked: 220, percentage: 95.7 },
      { id: 2, name: 'GMS002 - Govt Middle School', schoolCode: 'GMS002', sanctionedStrength: 180, admittedStrength: 175, studentRegistered: 170, studentMarked: 165, percentage: 97.1 },
      { id: 3, name: 'GPS003 - Central School', schoolCode: 'GPS003', sanctionedStrength: 200, admittedStrength: 190, studentRegistered: 185, studentMarked: 180, percentage: 97.3 },
      { id: 4, name: 'GHS004 - Public School', schoolCode: 'GHS004', sanctionedStrength: 150, admittedStrength: 145, studentRegistered: 140, studentMarked: 135, percentage: 96.4 }
    ],
    principals: [
      { id: 1, schoolName: 'GHS001 - Govt High School', schoolCode: 'GHS001', principal: 'Dr. Rajesh Kumar', present: true, absent: false, late: false },
      { id: 2, schoolName: 'GMS002 - Govt Middle School', schoolCode: 'GMS002', principal: 'Mrs. Anita Sharma', present: true, absent: false, late: false },
      { id: 3, schoolName: 'GPS003 - Central School', schoolCode: 'GPS003', principal: 'Mr. Suresh Patel', present: false, absent: false, late: true },
      { id: 4, schoolName: 'GHS004 - Public School', schoolCode: 'GHS004', principal: 'Dr. Meera Singh', present: false, absent: true, late: false }
    ],
    statistics: { totalUnits: 4, totalStudents: 780, overallAttendance: 96.6, unitLabel: 'Schools' }
  };

  private schoolData = {
    classes: [
      { id: 1, class: '6', totalSanctionedStrength: 50, admittedStrength: 48, studentsRegistered: 47, studentsMarkedAttendance: 45, percentageAttendance: 95.7 },
      { id: 2, class: '7', totalSanctionedStrength: 50, admittedStrength: 47, studentsRegistered: 46, studentsMarkedAttendance: 44, percentageAttendance: 95.7 },
      { id: 3, class: '8', totalSanctionedStrength: 50, admittedStrength: 47, studentsRegistered: 45, studentsMarkedAttendance: 43, percentageAttendance: 95.6 },
      { id: 4, class: '9', totalSanctionedStrength: 50, admittedStrength: 46, studentsRegistered: 44, studentsMarkedAttendance: 42, percentageAttendance: 95.5 },
      { id: 5, class: '10', totalSanctionedStrength: 50, admittedStrength: 47, studentsRegistered: 46, studentsMarkedAttendance: 44, percentageAttendance: 95.7 }
    ],
    employees: [
      { id: 1, employeeName: 'Dr. Rajesh Kumar', designation: 'Principal', checkInTime: '08:30', checkOutTime: '16:30', status: 'Present' as const },
      { id: 2, employeeName: 'Mrs. Priya Sharma', designation: 'Math Teacher', checkInTime: '08:45', checkOutTime: '15:45', status: 'Present' as const },
      { id: 3, employeeName: 'Mr. Amit Singh', designation: 'Science Teacher', checkInTime: '09:00', checkOutTime: '16:00', status: 'Late' as const },
      { id: 4, employeeName: 'Mrs. Sunita Anil', designation: 'English Teacher', checkInTime: '-', checkOutTime: '-', status: 'Absent' as const },
      { id: 5, employeeName: 'Mr. Ram Kumar', designation: 'Sports Teacher', checkInTime: '08:35', checkOutTime: '15:30', status: 'Present' as const }
    ],
    schoolStats: { totalStudents: 212, totalTeachers: 198, totalStaff: 14, overallAttendance: 93.4 },
    statistics: { totalUnits: 5, totalStudents: 212, overallAttendance: 95.6, unitLabel: 'Classes' }
  };

  setLevel(level: string): void {
    this.currentLevel.next(level);
  }

  setSelectedDistrict(district: string): void {
    this.selectedDistrict.next(district);
  }

  setSelectedSchool(school: string): void {
    this.selectedSchool.next(school);
  }

  navigateToDistrict(districtName: string): void {
    this.setSelectedDistrict(districtName);
    this.setLevel('district');
  }

  navigateToSchool(schoolName: string): void {
    this.setSelectedSchool(schoolName);
    this.setLevel('school');
  }

  getAttendanceData(): Observable<AttendanceRecord[]> {
    return new Observable(observer => {
      const level = this.currentLevel.value;
      if (level === 'state') {
        observer.next(this.stateData.attendance);
      } else if (level === 'district') {
        observer.next(this.districtData.attendance);
      } else {
        observer.next([]);
      }
      observer.complete();
    });
  }

  getEmployeeData(): Observable<EmployeeRecord[]> {
    return new Observable(observer => {
      const level = this.currentLevel.value;
      if (level === 'state') {
        observer.next(this.stateData.employees);
      } else {
        observer.next([]);
      }
      observer.complete();
    });
  }

  getPrincipalData(): Observable<PrincipalAttendance[]> {
    return new Observable(observer => {
      const level = this.currentLevel.value;
      if (level === 'district') {
        observer.next(this.districtData.principals);
      } else {
        observer.next([]);
      }
      observer.complete();
    });
  }

  getClassData(): Observable<ClassAttendance[]> {
    return new Observable(observer => {
      const level = this.currentLevel.value;
      if (level === 'school') {
        observer.next(this.schoolData.classes);
      } else {
        observer.next([]);
      }
      observer.complete();
    });
  }

  getEmployeeAttendanceData(): Observable<EmployeeAttendanceRecord[]> {
    return new Observable(observer => {
      const level = this.currentLevel.value;
      if (level === 'school') {
        observer.next(this.schoolData.employees);
      } else {
        observer.next([]);
      }
      observer.complete();
    });
  }

  getStatistics(): Observable<Statistics> {
    return new Observable(observer => {
      const level = this.currentLevel.value;
      if (level === 'state') {
        observer.next(this.stateData.statistics);
      } else if (level === 'district') {
        observer.next(this.districtData.statistics);
      } else if (level === 'school') {
        observer.next(this.schoolData.statistics);
      }
      observer.complete();
    });
  }

  getSchoolStats(): Observable<any> {
    return new Observable(observer => {
      observer.next(this.schoolData.schoolStats);
      observer.complete();
    });
  }
}
