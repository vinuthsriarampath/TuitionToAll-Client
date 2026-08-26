import {TrendPoint} from "@shared/utils/response/trend-point";

export class OverallEnrollmentResponse {
  trendPoints!: TrendPoint[];
  startDate!: string;
  endDate!: string;
  peakMonthTrend!: TrendPoint;
  growthRateSincePeakMonth!: number;
}
