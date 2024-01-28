import { Button, Card, Descriptions } from "antd";
import React, { FC, useEffect, useState } from "react";
import styles from "./index.module.less";
import * as echarts from "echarts";
import { useUserStore } from "@/store";
import { formatMoney, formatNum, formatState } from "@/utils";
import api from "@/api";
import { Dashboard } from "@/types/api";
import { useCharts } from "@/hook/useCharts";

const DashBoard: FC = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const [report, setReport] = useState<Dashboard.ReportData>();

  const [lineRef, lineChart] = useCharts();
  const [pieCityRef, pieCityChart] = useCharts();
  const [pieAgeRef, pieAgeChart] = useCharts();
  const [radarRef, radarChart] = useCharts();

  useEffect(() => {
    //创建线图
    // const lineChartDom = document.getElementById("lineChart");
    // const chartInstance = echarts.init(lineChartDom as HTMLElement);
    lineChart?.setOption({
      //   title: {
      //     text: "订单和流水走势图",
      //   },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["订单", "流水"],
      },
      grid: {
        left: "15%",
        right: "15%",
        bottom: "10%",
      },
      xAxis: {
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "1月",
          "12月",
        ],
      },
      yAxis: {
        type: "value",
      },
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      //   dataZoom: [
      //     {
      //       startValue: "2014-06-01",
      //     },
      //     {
      //       type: "inside",
      //     },
      //   ],

      series: [
        {
          name: "订单",
          type: "line",
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        },
        {
          name: "流水",
          type: "line",
          data: [
            1000, 2000, 3000, 400, 500, 6000, 700, 800, 900, 1000, 1100, 1200,
          ],
        },
      ],
    });

    //创建饼图(城市)
    // const pieChartCityDom = document.getElementById("pieChartCity");
    // const pieChartCityInstance = echarts.init(pieChartCityDom as HTMLElement);
    pieCityChart?.setOption({
      title: {
        text: "司机城市分布",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "城市分布",
          type: "pie",
          radius: "50%",
          data: [
            { value: 335, name: "北京" },
            { value: 310, name: "上海" },
            { value: 274, name: "广州" },
            { value: 235, name: "杭州" },
            { value: 400, name: "成都" },
          ],
        },
      ],
    });

    //创建饼图(年龄)
    // const pieChartAgeDom = document.getElementById("pieChartAge");
    // const pieChartAgeInstance = echarts.init(pieChartAgeDom as HTMLElement);
    pieAgeChart?.setOption({
      title: {
        text: "司机年龄分布",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "年龄分布",
          type: "pie",
          radius: [50, 100],
          roseType: "area",
          data: [
            { value: 30, name: "北京" },
            { value: 40, name: "上海" },
            { value: 60, name: "广州" },
            { value: 20, name: "杭州" },
            { value: 35, name: "成都" },
          ],
        },
      ],
    });

    //创建雷达图
    // const radarChartDom = document.getElementById("radarChart");
    // const radarChartInstance = echarts.init(radarChartDom as HTMLElement);
    radarChart?.setOption({
      //   title: {
      //     text: "司机模型诊断",
      //     left: "center",
      //   },
      legend: {
        data: ["司机模型诊断"],
      },
      radar: {
        indicator: [
          { name: "服务态度", max: 10 },
          { name: "在线时长", max: 600 },
          { name: "接单率", max: 100 },
          { name: "评分", max: 5 },
          { name: "关注度", max: 10000 },
        ],
      },
      series: [
        {
          name: "模型诊断",
          type: "radar",
          data: [
            {
              value: [8, 300, 80, 4, 9000],
              name: "司机模型诊断",
            },
          ],
        },
      ],
    });
  }, [lineChart, pieAgeChart, pieCityChart, radarChart]);

  const getReportData = async () => {
    const data = await api.getReportData();
    setReport(data);
  };

  useEffect(() => {
    getReportData();
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img
          className={styles.userAvatar}
          src={userInfo.userImg}
          alt={"User Avatar"}
        />
        <Descriptions title="User Info">
          <Descriptions.Item label="用户ID">
            {userInfo.userId}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">
            {userInfo.userEmail}
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            {formatState(userInfo.state)}
          </Descriptions.Item>
          <Descriptions.Item label="手机号">
            {userInfo.mobile}
          </Descriptions.Item>
          <Descriptions.Item label="岗位">{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label="部门">
            {userInfo.deptName}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className="title">司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className="title">总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className="title">总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className="title">开通城市</div>
          <div className={styles.data}>{formatNum(report?.cityNum)}座</div>
        </div>
      </div>

      <div className={styles.chart}>
        <Card
          title="订单和流水走势图"
          extra={<Button type="primary"> 刷新</Button>}
        >
          <div id="lineChart" ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>

      <div className={styles.chart}>
        <Card title="司机分布" extra={<Button type="primary"> 刷新</Button>}>
          <div className={styles.pieChart}>
            <div
              id="pieChartCity"
              ref={pieCityRef}
              className={styles.itemPie}
            ></div>
            <div
              id="pieChartAge"
              ref={pieAgeRef}
              className={styles.itemPie}
            ></div>
          </div>
        </Card>
      </div>

      <div className={styles.chart}>
        <Card title="模型诊断" extra={<Button type="primary"> 刷新</Button>}>
          <div
            id="radarChart"
            ref={radarRef}
            className={styles.itemChart}
          ></div>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;
