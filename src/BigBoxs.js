import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  BOX: 'box',
};

const BigBoxs = ({ number, size, status, index, moveBox }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      // 只在鼠标松开时交换盒子
      if (dragIndex !== hoverIndex) {
        moveBox(dragIndex, hoverIndex);
        item.index = hoverIndex; // 更新 index
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const boxSizeClass = size === 'L' ? 'large-box' : 'medium-box';
  const statusClass = status === '完了' ? 'completed' : status.includes('検証進捗') ? 'progress' : 'pending';

  return (
    <div
      ref={ref}
      className={`box ${boxSizeClass}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div>{number}</div>
      <div className={`status-label ${statusClass}`}>{status}</div>
    </div>
  );
};

export default BigBoxs;
