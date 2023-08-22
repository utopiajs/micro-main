import type { DataNode } from './index';

const isSameTreeLevel = (posOne: string, posTwo: string): boolean => {
  const posOneInfo = posOne.split('-');
  const posTwoInfo = posTwo.split('-');
  if (posOneInfo.length !== posTwoInfo.length) {
    return false;
  }
  // 数组最后一项不等，其余项相等，则视为统一层级
  return (
    posOneInfo.slice(0, posOneInfo.length - 1).join('') ===
    posTwoInfo.slice(0, posTwoInfo.length - 1).join('')
  );
};

const treeLoop = (
  data: DataNode[],
  key: React.Key,
  callback: (node: DataNode, i: number, treeData: DataNode[]) => void
) => {
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].id === key) {
      return callback(data[i], i, data);
    }
    if (data[i].children) {
      treeLoop(data[i].children ?? [], key, callback);
    }
  }

  return true;
};

const handleSortDragMenu = (info, originMenuTreeData) => {
  const { node, dragNode } = info;
  const dropPos = node.pos.split('-');
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

  const nextMenuTreeData = [...originMenuTreeData];
  // Find dragObject
  let dragObj;
  treeLoop(nextMenuTreeData, dragNode.key, (item, index, arr) => {
    arr.splice(index, 1);
    dragObj = item;
  });

  if (!info.dropToGap) {
    // Drop on the content
    treeLoop(nextMenuTreeData, node.key, (item) => {
      item.children = item.children || [];
      // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
      item.children.unshift(dragObj);
    });
  } else if (
    (info.node.children || []).length > 0 && // Has children
    info.node.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    treeLoop(nextMenuTreeData, node.key, (item) => {
      item.children = item.children || [];
      // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
      item.children.unshift(dragObj);
      // in previous version, we use item.children.push(dragObj) to insert the
      // item to the tail of the children
    });
  } else {
    let ar: DataNode[] = [];
    let i: number;
    treeLoop(nextMenuTreeData, node.key, (_item, index, arr) => {
      ar = arr;
      i = index;

      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    });
  }

  return { sortedMenuTreeData: nextMenuTreeData };
};

export { handleSortDragMenu, isSameTreeLevel, treeLoop };
