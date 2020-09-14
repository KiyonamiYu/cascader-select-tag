import React from 'react';
import './tag.css';

const themeColor = '#0156F8';

export type SizeType = 'small' | 'middle' | 'large';

export interface TagProps {
  size?: SizeType; // TODO
  multiple?: boolean;
  children: React.ReactNode;
  hasChildren: boolean;
  inPath: boolean;
  checked: boolean;
  hasChildrenChecked: boolean;
  onClick?: () => void;
}

export default function Tag(props: TagProps) {
  const {
    size = 'middle',
    multiple = false,
    children,
    hasChildren,
    inPath,
    checked,
    hasChildrenChecked,
    onClick = () => {},
  } = props;
  return (
    <div
      className="tag"
      style={{
        border: `1px solid ${inPath ? themeColor : '#C0C0C0'}`,
      }}
      onClick={onClick}
    >
      {/* 右上角勾选显示 */}
      {checked ? (
        <div className="tag-triangle">
          {/* 多选标记 */}
          {multiple ? (
            <div className="iconfont tag-triangle-text">&#xe63e;</div>
          ) : null}
        </div>
      ) : null}

      <span
        className="iconfont"
        style={{
          display: hasChildren ? 'inline-block' : 'none',
          color: hasChildrenChecked ? themeColor : '#C0C0C0',
          marginRight: 4,
        }}
      >
        &#xe62b;
      </span>
      {children}
    </div>
  );
}
