import React, { useState, useEffect, useCallback } from "react";
import Tag, { SizeType } from "./Tag";

const rootId = "$ROOT$";
const connectStr = "|-|";

function getNodeId(parentId: string, value: ValueType) {
  return `${parentId}${connectStr}${value}`;
}

export type ValueType = string | number;

export interface CascaderOptionType {
  value: ValueType;
  label: React.ReactNode;
  multiple?: boolean;
  allowCheck?: boolean;
  children?: Array<CascaderOptionType>;
}

export interface CascaderNodeType {
  // 用户设置
  value: ValueType;
  label: React.ReactNode;
  multiple?: boolean; // 当前节点的子节点是否可以多选
  allowCheck?: boolean; // 当前节点是否允许被勾选 // 默认只有叶子节点可以被勾选，非叶子节点不可以被勾选 // 父节点若可以勾选，与子节点勾选互斥：若父节点勾选，所有子节点取消勾选，若子节点勾选，父节点取消勾选
  // 内部设置
  parentId: string;
  children: Array<string>;
  checked: boolean; // 当前节点是否被勾选
  inPath: boolean; // 是否在选择的路径上
  hasChildrenChecked: boolean; // 是否有部分子孙节点勾选
}

// TODO Props 设置
const defaultProps = {
  style: {} as React.CSSProperties,
  className: "",
  prefixCls: "rhino",
  dataSource: [] as Array<CascaderOptionType>,
  value: [] as Array<Array<ValueType>>,
  defaultValue: [] as Array<Array<ValueType>>,
  multiple: false,
  size: "middle" as SizeType,
  onChange: () => {},
};

export type CascaderSelectTagProps = typeof defaultProps;

type CascaderTreeType = {
  [key: string]: CascaderNodeType;
};

export default function CascaderSelectTag(props: CascaderSelectTagProps) {
  const {
    style,
    className,
    prefixCls,
    dataSource,
    value,
    defaultValue,
    multiple,
    size,
    onChange,
  } = props;

  const [cascaderTree, setCascaderTree] = useState<CascaderTreeType>({});
  const [tagMatrix, setTagMatrix] = useState<CascaderNodeType[][]>([]);

  // 递归初始化层级树
  const generateTree = useCallback(() => {
    const newTree: CascaderTreeType = {};
    // 递归函数定义
    const recursive = (
      cascaderOption: CascaderOptionType,
      parentId: string
    ) => {
      const id = getNodeId(parentId, cascaderOption.value);
      newTree[id] = {
        value: cascaderOption.value,
        label: cascaderOption.label,
        // 每层 multiple 自定义或者跟随最顶层
        multiple:
          cascaderOption.multiple !== undefined
            ? cascaderOption.multiple
            : multiple,
        allowCheck:
          cascaderOption.allowCheck || // 默认父节点不能被 checked，但是可以通过 allowCheck 设置
          cascaderOption.children == null ||
          cascaderOption.children.length === 0, // 叶子节点一定可以被 checked
        parentId,
        children: (cascaderOption.children || []).map((child) =>
          getNodeId(id, child.value)
        ),
        checked: false,
        inPath: false,
        hasChildrenChecked: false,
      };
      cascaderOption?.children?.forEach((childOption) => {
        recursive(childOption, id);
      });
    };
    // 递归函数使用
    dataSource.forEach((option) => {
      recursive(option, rootId);
    });

    return newTree;
  }, [dataSource, multiple]);

  useEffect(() => {
    // 递归初始化层级树
    const initialTree = generateTree();
    // 根据默认值初始化节点状态 // TODO 如果初始化的不是可选中节点情况处理
    let nextTree = initialTree;
    // (value || defaultValue)?.forEach((path: Array<ValueType>) => {
    //   const id = path.join(connectStr);
    //   if (initialTree[id] != null) {
    //     nextTree = getNextTree(initialTree, id);
    //   }
    // });
    setCascaderTree(nextTree);

    // 使用生成的节点信息，初始化展示矩阵的第一列
    // TODO 展示 defaultValue 所在行
    const tagFirstRow: CascaderNodeType[] = [];
    dataSource.forEach((option) => {
      const id = getNodeId(rootId, option.value);
      const node = initialTree[id];
      tagFirstRow.push(node);
    });
    setTagMatrix([tagFirstRow]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  return (
    <div
      className={`${prefixCls}-tag-cascader-select ${className}`}
      style={style}
    >
      {tagMatrix?.map((rowNodes, rowIndex) => (
        <div key={rowIndex}>
          {rowNodes.map((node) => (
            <Tag
              hasChildren={node.children.length > 0}
              hasChildrenChecked={node.hasChildrenChecked}
              inPath={node.inPath}
              checked={node.checked}
              onClick={() => {
                if (node.inPath) {
                  // 关闭子节点
                  setTagMatrix((prev: CascaderNodeType[][]) => [
                    ...prev.filter((_, index) => index <= rowIndex),
                  ]);
                  // TODO 递归改变子 inPath
                } else {
                  // 展开子节点
                  setTagMatrix((prev) => [
                    ...prev.filter((_, index) => index <= rowIndex),
                    node.children.map((nodeId) => cascaderTree[nodeId]),
                  ]);
                  // TODO 递归改变子 inPath
                }

                // TODO 是否勾选当前节点
                // const nextTree = getNextTree(cascaderTree, node.id);
                // setCascaderTree(nextTree);

                // TODO 外部回调
                // if (onChange) {
                //   const result: Array<string> = [];
                //   Object.values(nextTree).forEach((innerNode) => {
                //     if (innerNode.checked) {
                //       result.push(innerNode.id);
                //     }
                //   });
                //   onChange(result);
                // }
              }}
            >
              {node.label}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  );
}

CascaderSelectTag.defaultProps = defaultProps;
