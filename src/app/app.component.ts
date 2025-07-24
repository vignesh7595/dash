import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService, AttendanceRecord, EmployeeRecord, Statistics, PrincipalAttendance, ClassAttendance, EmployeeAttendanceRecord } from './data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Face ID Education System';
  activeTab = 'state';
  loading = false;

  attendanceData: AttendanceRecord[] = [];
  employeeData: EmployeeRecord[] = [];
  principalData: PrincipalAttendance[] = [];
  classData: ClassAttendance[] = [];
  employeeAttendanceData: EmployeeAttendanceRecord[] = [];
  statistics: Statistics = { totalUnits: 0, totalStudents: 0, overallAttendance: 0, unitLabel: 'Units' };
  schoolStats: any = {};

  private subscriptions: Subscription[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();

    const levelSub = this.dataService.currentLevel$.subscribe(() => {
      this.loadData();
    });
    this.subscriptions.push(levelSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  switchTab(level: string): void {
    this.activeTab = level;
    this.dataService.setLevel(level);
  }

  private loadData(): void {
    this.loading = true;

    // Load attendance data
    const attendanceSub = this.dataService.getAttendanceData().subscribe(data => {
      this.attendanceData = data;
    });
    this.subscriptions.push(attendanceSub);

    // Load employee data
    const employeeSub = this.dataService.getEmployeeData().subscribe(data => {
      this.employeeData = data;
    });
    this.subscriptions.push(employeeSub);

    // Load principal data
    const principalSub = this.dataService.getPrincipalData().subscribe(data => {
      this.principalData = data;
    });
    this.subscriptions.push(principalSub);

    // Load class data
    const classSub = this.dataService.getClassData().subscribe(data => {
      this.classData = data;
    });
    this.subscriptions.push(classSub);

    // Load employee attendance data
    const empAttendanceSub = this.dataService.getEmployeeAttendanceData().subscribe(data => {
      this.employeeAttendanceData = data;
    });
    this.subscriptions.push(empAttendanceSub);

    // Load statistics
    const statsSub = this.dataService.getStatistics().subscribe(data => {
      this.statistics = data;
    });
    this.subscriptions.push(statsSub);

    // Load school stats if in school level
    if (this.activeTab === 'school') {
      const schoolStatsSub = this.dataService.getSchoolStats().subscribe(data => {
        this.schoolStats = data;
      });
      this.subscriptions.push(schoolStatsSub);
    }

    setTimeout(() => {
      this.loading = false;
    }, 300);
  }

  getPercentageClass(percentage: number): string {
    if (percentage >= 95) return 'percentage-cell high';
    if (percentage >= 90) return 'percentage-cell medium';
    return 'percentage-cell low';
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'present': return 'status-present';
      case 'absent': return 'status-absent';
      case 'late': return 'status-late';
      default: return '';
    }
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
