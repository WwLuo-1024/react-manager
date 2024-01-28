import * as echarts from "echarts";
import { RefObject, useEffect, useRef, useState } from "react";

export const useCharts = (): [
  RefObject<HTMLDivElement>,
  echarts.EChartsType | undefined
] => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<echarts.ECharts>();
  //页面加载完后 可以得到DOM节点
  useEffect(() => {
    const chart = echarts.init(chartRef?.current as HTMLElement);
    setChartInstance(chart);
  }, []);

  return [chartRef, chartInstance];
};
