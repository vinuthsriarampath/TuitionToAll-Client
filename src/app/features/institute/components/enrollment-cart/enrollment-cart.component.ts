import {Component, computed, input} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {CardShellComponent} from '@shared/ui';
import {OverallEnrollmentResponse} from '@features/student-batch-enrollment/dtos/responses/overall-enrollment-response';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-enrollment-cart',
  imports: [
    BaseChartDirective,
    CardShellComponent,
    DatePipe
  ],
  templateUrl: './enrollment-cart.component.html',
  styleUrl: './enrollment-cart.component.css'
})
export class EnrollmentCartComponent {
  data = input.required<OverallEnrollmentResponse>();

  public lineChartType: ChartType = 'line';

  public lineChartData = computed<ChartConfiguration['data']>( () => {
    const enrollmentData = this.data();

    const labels:string[] = enrollmentData.trendPoints.map(point =>
      new Intl.DateTimeFormat('en-US', { year: '2-digit', month: 'short'}).format(new Date(point.date))
    );
    const values:number[] = enrollmentData.trendPoints.map(point => point.value);
    return {
      labels: labels,
      datasets: [
        {
          data: values,
          borderColor: '#0F766E',
          backgroundColor: (context:any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 250);
            gradient.addColorStop(0, 'rgb(23 175 164 / 0.39)');
            gradient.addColorStop(1, 'rgba(15, 118, 110, 0.0)');
            return gradient;
          },
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#0F766E',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    }
  });

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: '#0b4064'
        },
        ticks: {
          color: '#FFFFFF'
        },
        title: {
          display: true,
          color: '#FFFFFF'
        }
      },
      y: {
        grid: {
          display: false
        },
        min: 0,
        ticks: {
          color: '#FFFFFF'
        },
        title: {
          display: true,
          color: '#FFFFFF'
        }
      }
    }
  };
}
