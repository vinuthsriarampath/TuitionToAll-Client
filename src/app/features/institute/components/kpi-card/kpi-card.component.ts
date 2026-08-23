import {Component, computed, effect, input} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {ArrowDownRight, ArrowUpRight, LucideAngularModule, LucideIconData} from 'lucide-angular';
import {DecimalPipe, NgClass} from '@angular/common';
import {CardShellComponent} from '@shared/ui';
import {DashboardKpi} from '@shared/utils/response/dashboard-kpi';
import {ChangeValueType} from '@shared/utils/enums/change-value-type';

@Component({
  selector: 'app-kpi-card',
  imports: [
    BaseChartDirective,
    LucideAngularModule,
    NgClass,
    CardShellComponent,
    DecimalPipe
  ],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css'
})
export class KpiCardComponent{
  icon = input.required<LucideIconData>();
  title = input.required<string>();
  data = input.required<DashboardKpi>();

  readonly isChangeValuePositive = computed(() =>
    this.data().changeValue >= 0
  );

  readonly isPercentageChange = computed(() =>
    this.data().changeValueType === ChangeValueType.PERCENTAGE
  );

  protected sparklineType:ChartType = 'line';

  readonly sparklineData = computed<ChartConfiguration<'line'>['data']>(() => {

    const kpi = this.data();

    const strokeColor = kpi.changeValue >= 0 ? '#10B981' : '#EF4444';

    const hasTrendData = kpi.trend.length > 0;

    const labels = hasTrendData ? kpi.trend.map(point => point.date) : ['', '', '', '', '', ''];

    const values = hasTrendData ? kpi.trend.map(point => point.value) : [0, 0, 0, 0, 0, 0];

    return {
      labels,
      datasets: [
        {
          data: values,
          borderColor: strokeColor,
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0
        }
      ]
    };
  });


  protected sparklineOptions:ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements:{
      point: { radius: 0 },
      line: { tension: 0.4, borderWidth: 2}
    },
    scales: {
      x: { display:false },
      y: { grid:{display: false},ticks: {
          color: '#FFFFFF'
        },  }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };

  protected readonly ArrowUpRight = ArrowUpRight;
  protected readonly ArrowDownRight = ArrowDownRight;
}
