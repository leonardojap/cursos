import { Component } from '@angular/core';
import { DashboardService } from '@shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  statistics: any = {
    topSixMoths: [],
    topStudents: [],
    totalStudents: 0,
    totalCourses: 0,
  };
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getStatistics().subscribe((data: any) => {
      const resp = data.data;
      this.statistics = resp;
    });
  }
}
