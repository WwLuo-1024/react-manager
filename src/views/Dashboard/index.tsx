import { Button, Card, Descriptions } from "antd";
import React, { FC, useEffect } from "react";
import styles from "./index.module.less";
import * as echarts from "echarts";

const DashBoard: FC = () => {
  useEffect(() => {
    //创建线图
    const lineChartDom = document.getElementById("lineChart");
    const chartInstance = echarts.init(lineChartDom as HTMLElement);
    chartInstance.setOption({
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
    const pieChartCityDom = document.getElementById("pieChartCity");
    const pieChartCityInstance = echarts.init(pieChartCityDom as HTMLElement);
    pieChartCityInstance.setOption({
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
    const pieChartAgeDom = document.getElementById("pieChartAge");
    const pieChartAgeInstance = echarts.init(pieChartAgeDom as HTMLElement);
    pieChartAgeInstance.setOption({
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
    const radarChartDom = document.getElementById("radarChart");
    const radarChartInstance = echarts.init(radarChartDom as HTMLElement);
    radarChartInstance.setOption({
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
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img
          className={styles.userAvatar}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          alt=""
        />
        <Descriptions title="User Info">
          <Descriptions.Item label="User Id">100001</Descriptions.Item>
          <Descriptions.Item label="Email">test@mars.com</Descriptions.Item>
          <Descriptions.Item label="State">On-the-job</Descriptions.Item>
          <Descriptions.Item label="Telephone">17600001111</Descriptions.Item>
          <Descriptions.Item label="Role">Frontend Developer</Descriptions.Item>
          <Descriptions.Item label="Department">Product</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className="title">司机数量</div>
          <div className={styles.data}>100个</div>
        </div>
        <div className={styles.card}>
          <div className="title">总流水</div>
          <div className={styles.data}>10000元</div>
        </div>
        <div className={styles.card}>
          <div className="title">总订单</div>
          <div className={styles.data}>2000单</div>
        </div>
        <div className={styles.card}>
          <div className="title">开通城市</div>
          <div className={styles.data}>50座</div>
        </div>
      </div>

      <div className={styles.chart}>
        <Card
          title="订单和流水走势图"
          extra={<Button type="primary"> 刷新</Button>}
        >
          <div id="lineChart" className={styles.itemChart}></div>
        </Card>
      </div>

      <div className={styles.chart}>
        <Card title="司机分布" extra={<Button type="primary"> 刷新</Button>}>
          <div className={styles.pieChart}>
            <div id="pieChartCity" className={styles.itemPie}></div>
            <div id="pieChartAge" className={styles.itemPie}></div>
          </div>
        </Card>
      </div>

      <div className={styles.chart}>
        <Card title="模型诊断" extra={<Button type="primary"> 刷新</Button>}>
          <div id="radarChart" className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;
