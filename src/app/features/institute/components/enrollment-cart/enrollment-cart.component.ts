import { Component } from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-enrollment-cart',
  imports: [
    BaseChartDirective,
    CardShellComponent
  ],
  templateUrl: './enrollment-cart.component.html',
  styleUrl: './enrollment-cart.component.css'
})
export class EnrollmentCartComponent {
  public lineChartType: ChartType = 'line';

  public lineChartData: ChartConfiguration['data'] = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        data: [500, 600, 650, 800, 850, 940],
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
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: {
          display: false
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
