import React, { useState } from 'react';
import BigBoxs from './BigBoxs';
import './App.css'; 
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';  // 使用 TouchBackend

const initialBoxes = [
  { number: "001", size: "M", status: "配備待ち" },
  { number: "003", size: "M", status: "検証進捗 1/7" },
  { number: "001", size: "M", status: "配備待ち" },
  { number: "001", size: "M", status: "配備待ち" },
  { number: "002", size: "L", status: "完了" },
  { number: "002", size: "L", status: "配備待ち" },
  { number: "002", size: "L", status: "完了" },
  { number: "002", size: "L", status: "配備待ち" }
];

function App() {
  const [boxes, setBoxes] = useState(initialBoxes);

  const moveBox = (dragIndex, hoverIndex) => {
    // console.log( "拖拽：" + dragIndex, "触发：" +  hoverIndex);
    
    // if (dragIndex === hoverIndex) {
    //   return; // 如果拖拽的索引和目标索引相同，直接返回，不触发位置改变
    // }
    const newBoxes = [...boxes];
    const draggedBox = newBoxes[dragIndex];
    newBoxes.splice(dragIndex, 1);
    newBoxes.splice(hoverIndex, 0, draggedBox);
    setBoxes(newBoxes);
    console.log('变化顺序后的 JSON:', JSON.stringify(newBoxes, null, 2));
  };

  return (
    <div className="app">
      <h1>东门Locker</h1>
      {/* 使用 TouchBackend，无论是在移动端还是桌面端 */}
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <div className="box-container">
          {boxes.map((box, index) => (
            <BigBoxs
              key={index}
              index={index}
              number={box.number}
              size={box.size}
              status={box.status}
              moveBox={moveBox}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
