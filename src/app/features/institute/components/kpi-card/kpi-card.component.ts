import {Component, input, OnInit} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {ArrowDownRight, ArrowUpRight, LucideAngularModule, LucideIconData} from 'lucide-angular';
import {NgClass} from '@angular/common';
import {CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-kpi-card',
  imports: [
    BaseChartDirective,
    LucideAngularModule,
    NgClass,
    CardShellComponent
  ],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css'
})
export class KpiCardComponent implements OnInit{
  icon = input.required<LucideIconData>();
  title = input.required<string>();
  value = input.required<string>();
  changeValue = input.required<string>();
  changeLabel = input.required<string>();
  sparklineData = input<number[]>([]);
  isPositive = input<boolean>(true);

  protected sparklineType:ChartType = 'line';
  protected sparklineConfig!: ChartConfiguration['data'];
  protected sparklineOptions:ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements:{
      point: { radius: 0 },
      line: { tension: 0.4, borderWidth: 2}
    },
    scales: {
      x: { display:false },
      y: { display:false }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  }

  ngOnInit(): void {
    const strokeColor = this.isPositive() ? '#10B981' : '#EF4444';
    this.sparklineConfig = {
      labels: this.sparklineData().map(() => ''),
      datasets: [
        {
          data: this.sparklineData(),
          borderColor: strokeColor,
          backgroundColor: 'transparent',
          fill: false
        }
      ]
    };
  }

  protected readonly ArrowUpRight = ArrowUpRight;
  protected readonly ArrowDownRight = ArrowDownRight;
}
