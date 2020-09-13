import React, { useState, useEffect, useCallback } from "react";
import Tag, { SizeType } from "./Tag";

const rootId = "$DUMMY_ROOT$";
const splitter = "|-|";

function getNodeId(parentId: string, value: ValueType) {
  return `${parentId}${splitter}${value}`;
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
  // 内部用户设置
  multiple?: boolean; // 当前节点的子节点是否可以多选
  allowCheck?: boolean; // 当前节点是否允许被勾选 // 默认只有叶子节点可以被勾选，非叶子节点不可以被勾选 // 父节点若可以勾选，与子节点勾选互斥：若父节点勾选，所有子节点取消勾选，若子节点勾选，父节点取消勾选
  // 内部设置
  id: string;
  parentId: string;
  children: Array<string>;
  // 内部点击状态切换
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
};

export type CascaderSelectTagProps = typeof defaultProps & {
  onChange?: (result: Array<Array<string>>) => void;
};

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
  const [nodeMatrix, setNodeMatrix] = useState<CascaderNodeType[][]>([]);

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
        id,
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

  const getNextTree = useCallback(
    (nowTree: CascaderTreeType, nodeId: string) => {
      const nextTree = { ...nowTree };
      const node = nextTree[nodeId];

      // 先取消所有节点的 inPath
      const nodeInpathTmp = node.inPath; // 为了双击收起能正常显示 inPath
      (function recursive(nodes: CascaderNodeType[]) {
        for (const node of nodes) {
          if (node.inPath) {
            node.inPath = false;
            recursive(node.children.map((id) => nextTree[id]));
          }
        }
      })(nodeMatrix[0]);

      // 如果这个节点不允许被勾选（单纯的父节点）
      if (!node.allowCheck) {
        // 再顺着还原 inPath
        node.inPath = !nodeInpathTmp;
        let parentNode = nextTree[node.parentId];
        while (parentNode != null) {
          parentNode.inPath = true;
          parentNode = nextTree[parentNode.parentId];
        }
        // unchecked => checked
      } else if (!node.checked) {
        // 父子节点勾选互斥，如果点击的是父节点，那也要将所有的子节点取消状态
        let cleanRoots: CascaderNodeType[] = [node];
        let parentNode = nextTree[node.parentId];
        if (parentNode && parentNode.checked) {
          parentNode.checked = false;
        }
        // 先变回最初的状态
        while (parentNode != null) {
          // !parentNode.multiple && !parentNode.hasChildrenChecked // 父节点单选且之前没有选择过，那选了子节点，也意味着选了父节点，如果祖先是单选就会被影响
          // parentNode.multiple && !parentNode.hasChildrenChecked // 父节点多选且之前没有被选择过，那同上
          if (parentNode.multiple && parentNode.hasChildrenChecked) {
            // 父节点多选，且之前就被选择过，那再选一个也没有关系
            break;
          }
          if (!parentNode.multiple && parentNode.hasChildrenChecked) {
            // 父节点单选，之前有其他子节点被选择过，那就要清空其他的
            cleanRoots[0] = parentNode;
          }
          parentNode = nextTree[parentNode.parentId];
        }
        if (parentNode == null && !multiple) {
          cleanRoots = [...nodeMatrix[0]];
        }
        (function recursive(nodes: CascaderNodeType[]) {
          nodes.forEach((iNode) => {
            iNode.checked = false;
            iNode.hasChildrenChecked = false;
            iNode.inPath = false;
            recursive(
              iNode.children
                .map((id) => nextTree[id])
                .filter(
                  (child) =>
                    child.checked || child.hasChildrenChecked || child.inPath
                )
            );
          });
        })(cleanRoots);

        // 再顺着还原 inPath、hasChildrenChecked
        parentNode = nextTree[node.parentId];
        while (parentNode != null) {
          // 父子勾选互斥
          if (parentNode.checked) {
            parentNode.checked = false;
          }
          parentNode.inPath = true;
          parentNode.hasChildrenChecked = true;
          parentNode = nextTree[parentNode.parentId];
        }
        node.checked = true;
        if (node.allowCheck && node.children.length > 0) {
          node.inPath = true;
        }
        // checked => unchecked
      } else {
        // 父节点的 hasChildrenChecked 一定为 true
        node.checked = false;
        let parentNode = nextTree[node.parentId];
        while (parentNode != null) {
          if (parentNode.multiple) {
            const childrenCheckedResult = parentNode.children
              .map((id) => nextTree[id])
              .filter((child) => child.checked || child.hasChildrenChecked);
            if (childrenCheckedResult.length > 0) {
              break;
            }
          }
          parentNode.hasChildrenChecked = false;
          parentNode = nextTree[parentNode.parentId];
        }
        // 再顺着还原 inPath
        parentNode = nextTree[node.parentId];
        while (parentNode != null) {
          parentNode.inPath = true;
          parentNode = nextTree[parentNode.parentId];
        }
      }
      return nextTree;
    },
    [nodeMatrix, multiple]
  );

  useEffect(() => {
    // 递归初始化层级树
    const initialTree = generateTree();
    setCascaderTree(initialTree);

    // 使用生成的节点信息，初始化展示矩阵的第一列
    const firstRow: CascaderNodeType[] = [];
    dataSource.forEach((option) => {
      const id = getNodeId(rootId, option.value);
      const node = initialTree[id];
      firstRow.push(node);
    });
    setNodeMatrix([firstRow]);

    // 根据默认值初始化节点状态 // TODO 如果初始化的不是可选中节点情况处理
    // let nextTree = initialTree;
    // console.log(value || defaultValue);
    // (value || defaultValue)?.forEach((path: Array<ValueType>) => {
    //   let parentId = rootId;
    //   path.forEach((value) => {
    //     const id = getNodeId(parentId, value);
    //     if (nextTree[id] != null) {
    //       nextTree = getNextTree(nextTree, id, firstRow);
    //       parentId = id;
    //     }
    //   });
    // });
    // setCascaderTree(nextTree);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  return (
    <div
      className={`${prefixCls}-tag-cascader-select ${className}`}
      style={style}
    >
      {nodeMatrix?.map((rowNodes, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            borderBottom: "1px solid red",
          }}
        >
          {rowNodes.map((node) => (
            <Tag
              key={node.id}
              hasChildren={node.children.length > 0}
              hasChildrenChecked={node.hasChildrenChecked}
              inPath={node.inPath}
              checked={node.checked}
              onClick={() => {
                if (node.children.length > 0 && !node.inPath) {
                  // 展开子节点
                  setNodeMatrix((prev) => [
                    ...prev.filter((_, index) => index <= rowIndex),
                    node.children.map((nodeId) => cascaderTree[nodeId]),
                  ]);
                } else {
                  // 关闭子节点
                  setNodeMatrix((prev: CascaderNodeType[][]) => [
                    ...prev.filter((_, index) => index <= rowIndex),
                  ]);
                }

                const nextTree = getNextTree(cascaderTree, node.id);
                setCascaderTree(nextTree);

                if (node.allowCheck && onChange) {
                  const result: Array<Array<string>> = [];
                  Object.values(nextTree).forEach((iNode) => {
                    if (iNode.checked) {
                      result.push(iNode.id.split(splitter).slice(1));
                    }
                  });
                  onChange(result);
                }
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
