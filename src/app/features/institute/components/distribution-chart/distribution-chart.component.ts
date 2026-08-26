import {Component, computed, input} from '@angular/core';
import {ChartConfiguration} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {CardShellComponent} from '@shared/ui';
import {
  EnrollmentDistributionResponse
} from '@features/student-batch-enrollment/dtos/responses/enrollment-distribution-response';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-distribution-chart',
  imports: [
    BaseChartDirective,
    CardShellComponent,
    DecimalPipe
  ],
  templateUrl: './distribution-chart.component.html',
  styleUrl: './distribution-chart.component.css'
})
export class DistributionChartComponent {
  data = input.required<EnrollmentDistributionResponse>();

  protected doughnutChartData = computed<ChartConfiguration<'doughnut'>['data']>(() => {
    const distribution = this.data();
    return{
      labels: ['Active', 'Completed', 'Suspended'],
      datasets: [
        {
          data: [distribution.activeEnrollments, distribution.completedEnrollments, distribution.suspendedEnrollments],
          backgroundColor: ['#0F766E', '#6EE7B7', '#F59E0B'],
          borderWidth: 0,
          hoverOffset: 4
        }
      ]
    }
  });

  protected doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false }
    }
  };
}
