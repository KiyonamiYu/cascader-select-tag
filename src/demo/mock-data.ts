import { CascaderOptionType } from "../CascaderSelectTag";

export interface GoodsType {
  type: string;
  name: string;
  imgURL: string;
  price: number;
}

export const allGoods: GoodsType[] = [
  {
    type: "1-1",
    name: "李宁运动裤男士2020新款训练系列秋季男装裤子收口梭织运动长裤",
    imgURL:
      "https://gaitaobao1.alicdn.com/tfscom/i4/92688455/O1CN01nh9qrY2CKRMB3a38H_!!0-item_pic.jpg_240x240xz.jpg_.webp",
    price: 198,
  },
  {
    type: "1-1",
    name: "男士短袖t恤衣服潮牌潮流纯棉白色",
    imgURL:
      "https://gaitaobao4.alicdn.com/tfscom/i2/3018230850/O1CN01qjiZAz1I9LGM5PMbE_!!3018230850-0-lubanu-s.jpg_240x240xz.jpg_.webp",
    price: 499,
  },
  {
    type: "1-3",
    name: "牛百岁0添加 澳洲原切进口肉眼肉牛排套餐家庭新鲜牛扒生鲜非腌制",
    imgURL:
      "https://gaitaobao3.alicdn.com/tfscom/i1/2208676223663/O1CN01RqLD7D1cvhPX1x1GV_!!2208676223663-0-pixelsss.jpg_240x240xz.jpg_.webp",
    price: 238,
  },
  {
    type: "1-3",
    name: "三都港醇香黄鱼鲞 调味黄花鱼 小黄",
    imgURL:
      "https://gaitaobao1.alicdn.com/tfscom/i1/3837825683/O1CN01gHF8Mb1rqrSm19mAl_!!0-item_pic.jpg_240x240xz.jpg_.webp",
    price: 99.9,
  },
  {
    type: "1-4",
    name: "Java从入门到精通(第5五版) java语言程序设计电脑编程序员计",
    imgURL:
      "https://gaitaobao1.alicdn.com/tfscom/i2/2406931838/O1CN01tslq5q1PRqZoXgJeE_!!2406931838-0-lubanu-s.jpg_240x240xz.jpg_.webp",
    price: 34.9,
  },
  {
    type: "1-4",
    name:
      "JavaScript语言精粹修订版 javascript语言本质 挖掘JavaScript精华 java语言编",
    imgURL:
      "https://gaitaobao1.alicdn.com/tfscom/i3/4093052206/O1CN019jiXel1SAOLL7xDwW_!!0-item_pic.jpg_240x240xz.jpg_.webp",
    price: 38.5,
  },
  {
    type: "1-5",
    name: "山地自行车成年男女减震变速青少年学生轻便代步越野一体轮自行车",
    imgURL:
      "https://gaitaobao4.alicdn.com/tfscom/i1/2140317270/O1CN01UlrJPd23Zi0nHDGdn_!!2140317270-0-lubanu-s.jpg_240x240xz.jpg_.webp",
    price: 192,
  },
  {
    type: "1-2-1",
    name: "Samsung/三星 GALAXY S9 S9Plus盖乐世S9国行G9650全网通全新手机",
    imgURL:
      "https://gaitaobao4.alicdn.com/tfscom/i1/3971184073/O1CN01PZCpzS1fxTlXpWWiu_!!3971184073.jpg_240x240xz.jpg_.webp",
    price: 1999,
  },
  {
    type: "1-2-2",
    name: "Apple/苹果 iPhone 11 手机现货国行 全国联保",
    imgURL:
      "https://gaitaobao3.alicdn.com/tfscom/i2/2206913270003/O1CN01xtw3d71BtPoHeWGDC_!!2206913270003-0-scmitem6000.jpg_240x240xz.jpg_.webp",
    price: 4949,
  },
  {
    type: "1-2-3",
    name: "Huawei/华为 nova 6 SE官方旗舰手机4800万AI四摄",
    imgURL:
      "https://gaitaobao4.alicdn.com/tfscom/i2/686947088/O1CN01X8q4ED22ELw9xYsrB_!!0-item_pic.jpg_240x240xz.jpg_.webp",
    price: 1819,
  },
  {
    type: "1-2-4",
    name: "OPPO A92S oppoa92s手机opop新r17 a11x r9s a72 k7 a9",
    imgURL:
      "https://gaitaobao4.alicdn.com/tfscom/i4/409658261/O1CN01gW6hXo2AtaW8ZCbwj_!!0-item_pic.jpg_240x240xz.jpg_.webp",
    price: 1999,
  },
  {
    type: "1-2-5",
    name: "现货Xiaomi/小米 Redmi K30 至尊纪念版红米k30pro手机尊享5g旗舰",
    imgURL:
      "https://gaitaobao2.alicdn.com/tfscom/i3/860541377/O1CN01ECv8JX1M2i0CRn3jU_!!860541377-0-lubanu-s.jpg_240x240xz.jpg_.webp",
    price: 1688,
  },
  {
    type: "1-2-6",
    name: "当天发货/24期分期】meizu魅族17Pro骁龙865旗舰5G新品6400万四摄官方天",
    imgURL:
      "https://gaitaobao3.alicdn.com/tfscom/i2/686947088/O1CN01XLhUdA22ELvxzvwdJ_!!0-item_pic.jpg_240x240xz.jpg_.webp",
    price: 3928,
  },
  {
    type: "1-2-7",
    name: "一加OnePlus 8手机5G新品直降一加8pro一加7pro骁",
    imgURL:
      "https://gaitaobao2.alicdn.com/tfscom/i1/268451883/O1CN01GkLYRZ1PmSPgoNh7j_!!0-item_pic.jpg_240x240xz.jpg_.webp",
    price: 3799,
  },
];

export const dataSource1: Array<CascaderOptionType> = [
  {
    value: "浙江省",
    label: "浙江省",
    children: [
      {
        value: "杭州市",
        label: "杭州市",
        children: [
          {
            value: "滨江区",
            label: "滨江区",
          },
          {
            value: "淳安县",
            label: "淳安县",
          },
          {
            value: "江干区",
            label: "江干区",
          },
        ],
      },
      {
        value: "温州市",
        label: "温州市",
        children: [
          {
            value: "苍南县",
            label: "苍南县",
          },
          {
            value: "洞头区",
            label: "洞头区",
          },
          {
            value: "瓯海区",
            label: "瓯海区",
          },
          {
            value: "鹿城区",
            label: "鹿城区",
          },
          {
            value: "平阳县",
            label: "平阳县",
          },
        ],
      },
    ],
  },
  {
    value: "湖北省",
    label: "湖北省",
    children: [
      {
        value: "鄂州市",
        label: "鄂州市",
        children: [
          {
            value: "鄂州区",
            label: "鄂州区",
          },
          {
            value: "华容区",
            label: "华容区",
          },
          {
            value: "梁子湖区",
            label: "梁子湖区",
          },
        ],
      },
      {
        value: "黄冈市",
        label: "黄冈市",
        children: [
          {
            value: "红安县",
            label: "红安县",
          },
          {
            value: "黄梅县",
            label: "黄梅县",
          },
          {
            value: "罗田县",
            label: "罗田县",
          },
          {
            value: "麻城市",
            label: "麻城市",
          },
          {
            value: "团风县",
            label: "团风县",
          },
        ],
      },
    ],
  },
];

export const dataSource2: Array<CascaderOptionType> = [
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
        multiple: true,
        allowCheck: true,
        children: [
          {
            value: "1-2-1",
            label: "三星",
          },
          {
            value: "1-2-2",
            label: "苹果",
          },
          {
            value: "1-2-3",
            label: "华为",
          },
          {
            value: "1-2-4",
            label: "OPPO",
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
