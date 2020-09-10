import React from "react";

export type SizeType = "small" | "middle" | "large";

export interface TagProps {
  size?: SizeType; // TODO
  children: React.ReactNode;
  inPath: boolean;
  checked: boolean;
  hasChildren: boolean;
  hasChildrenChecked: boolean;
  onClick?: () => void;
}

export default function Tag(props: TagProps) {
  const {
    size = "middle",
    children,
    inPath,
    checked,
    hasChildren,
    hasChildrenChecked,
    onClick = () => {},
  } = props;
  return (
    <div
      style={{
        display: "inline-block",
        padding: "10px 20px",
        margin: 8,
        border: `1px solid ${inPath ? "blue" : "gray"}`,
        background: checked ? "green" : "white",
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: hasChildren ? "inline-block" : "none",
          marginRight: 4,
          width: 4,
          height: 8,
          background: hasChildrenChecked ? "blue" : "gray",
        }}
      />
      {children}
    </div>
  );
}
