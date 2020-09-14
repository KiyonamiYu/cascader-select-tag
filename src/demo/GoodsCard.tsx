import React from "react";

interface GoodsCardProps {
  type: string;
  name: string;
  imgURL: string;
  price: number;
}

export default function GoodsCard(props: GoodsCardProps) {
  const { type, name, imgURL, price } = props;
  return (
    <div
      style={{
        display: "inline-block",
        width: 240,
        border: "1px solid #cacaca",
        margin: 20,
      }}
    >
      <img src={imgURL} alt={name} />
      <div
        style={{
          fontSize: 12,
          height: 40,
          margin: 10,
          overflow: "hidden",
        }}
      >
        {name}
      </div>
      <div>
        ￥
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginRight: 4,
            color: "#ed462f",
          }}
        >
          {price}
        </span>
      </div>
    </div>
  );
}
