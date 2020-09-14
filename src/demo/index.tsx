import React, { useState } from "react";

import CascaderSelectTag from "../CascaderSelectTag";
import GoodCard from "./GoodsCard";

import { dataSource1, dataSource2, allGoods, GoodsType } from "./mock-data";

export default function Demo() {
  const [displayWindow, setDisplayWindow] = useState<GoodsType[]>([]);
  return (
    <>
      <h1>多选</h1>
      <CascaderSelectTag
        dataSource={dataSource1}
        multiple
        // value={[["1", "1-2", "1-2-2", "1-2-2-1"]]}
        onChange={(result) => {
          console.log("check", result);
        }}
      />
      <div>
        <h1>父节点包含子节点</h1>
        <h2>基本配置</h2>
        <ul>
          <li>
            “待发货”、“待收货”、“评价”可单选。
            “待发货”作为父节点可被勾选（通过设置），“待收货”无子节点，“评价”作为父节点不可被勾选（默认）
          </li>
          <li>“男装”、“手机”、“生鲜”可多选，“手机”作为父节点可被勾选</li>
          <li>“三星”、“苹果”、“华为”、“OPPO”可多选</li>
        </ul>
        <h2>勾选过程</h2>
        <p>
          “待发货”包含“男装”、“手机”、“生鲜”，但不限于这三类，比如还可以包含“图书”、“运动”等。
          所以当我们勾选“待发货”，就不单单是只有这三种品类，而是列举出全部品类的商品。
          当我们勾选“男装”，自动取消了“待发货”（父子节点勾选互斥），那就只列出“男装”还没有发货的商品。
          又因为这一层级设置为多选，所以勾选“生鲜”，那底下就列举出所有的“男装”和“生鲜”。
          最后同理，也适用于“手机”的勾选。
        </p>
        <ul>
          <li>勾选“待发货”共 14 件商品</li>
          <li>
            勾选“男装”、“手机”、“生鲜”共 11 件商品，缺少的 3(14- 11)
            件商品品类分别是“图书”、“运动”
          </li>
        </ul>
        <ul>
          <li>只勾选“手机”共 7 件商品</li>
          <li>
            勾选“三星”、“苹果”、“华为”、“OPPO”共 4 件商品，缺少的 3(7- 4)
            件商品品类分别是“一加”、“小米”、“魅族”
          </li>
        </ul>
        <h2>Demo</h2>
        <CascaderSelectTag
          dataSource={dataSource2}
          // value={[["1", "1-2", "1-2-2", "1-2-2-1"]]}
          onChange={(result) => {
            let goods: GoodsType[] = [];

            result.forEach((path) => {
              const selectedValue = path[path.length - 1];
              allGoods
                .filter((item) => item.type.startsWith(selectedValue))
                .forEach((item) => {
                  goods.push(item);
                });
            });

            setDisplayWindow(goods);
          }}
        />

        <div
          style={{
            marginTop: 30,
          }}
        >
          <div>共 {displayWindow.length} 件商品</div>
          {displayWindow.map((item) => (
            <GoodCard {...item} />
          ))}
        </div>
      </div>
    </>
  );
}
