interface Size {
  width: number;
  height: number;
}

interface Position {
  top: number;
  bottom: number;
  right: number;
  left: number;
}

interface BarChart {
  data: Array<{ category: string; value: number }>;
  size: Size;
  resize?: "fixed" | "responsive";
  color?: string;
}

interface BarChartDataItem {
  category: string;
  value?: number;
  valueFormatted?: string;
  delta?: number;
  deltaFormatted?: string;
  isDeltaGood?: boolean;
  isDeltaBad?: boolean;
  filler?: boolean;
}

type BarChartData = Array<BarChartDataItem>;

export type { Size, Position, BarChart, BarChartDataItem, BarChartData };
