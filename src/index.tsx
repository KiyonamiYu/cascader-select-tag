import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import CascaderSelectTag, { CascaderOptionType } from "./CascaderSelectTag";

const dataSource: Array<CascaderOptionType> = [
  {
    value: 1,
    label: "待发货",
    multiple: true,
    allowCheck: true,
    children: [
      {
        value: "1-1",
        label: "男装",
      },
      {
        value: "1-2",
        label: "手机",
        multiple: false,
        allowCheck: false,
        children: [
          {
            value: "1-2-1",
            label: "三星",
          },
          {
            value: "1-2-2",
            label: "苹果",
            children: [
              {
                value: "1-2-2-1",
                label: "2010 年系列",
              },
              {
                value: "1-2-2-2",
                label: "2015 年系列",
              },
              {
                value: "1-2-2-3",
                label: "2020 年系列",
              },
            ],
          },
          {
            value: "1-2-3",
            label: "华为",
          },
        ],
      },
      {
        value: "1-3",
        label: "生鲜",
      },
    ],
  },
  {
    value: 2,
    label: "待收货",
  },
  {
    value: 3,
    label: "评价",
    children: [
      {
        value: "3-1",
        label: "待评价",
      },
      {
        value: "3-2",
        label: "已评价",
      },
    ],
  },
];

ReactDOM.render(
  <React.StrictMode>
    <CascaderSelectTag dataSource={dataSource} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
