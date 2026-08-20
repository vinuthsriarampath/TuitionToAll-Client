import { Component } from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-distribution-chart',
  imports: [
    BaseChartDirective,
    CardShellComponent
  ],
  templateUrl: './distribution-chart.component.html',
  styleUrl: './distribution-chart.component.css'
})
export class DistributionChartComponent {
  // public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Active', 'Completed', 'Pending'],
    datasets: [
      {
        data: [899, 225, 75],
        backgroundColor: ['#0F766E', '#6EE7B7', '#F59E0B'],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false }
    }
  };
}
