import {ChangeValueType} from '@shared/utils/enums/change-value-type';
import {TrendPoint} from '@shared/utils/response/trend-point';

export class DashboardKpi {
  value!: number;
  changeValue!: number;
  changeValueType!: ChangeValueType;
  changeLabel!: string;
  trend!: TrendPoint[];
}
