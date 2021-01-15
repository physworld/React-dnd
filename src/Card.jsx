//LEFT COLUMN
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    cursor: 'move',
};
export const Card = ({ id, text, index, moveCard, left, top, deleteCard}) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item, monitor) {

            if (!ref.current) {
                 return;
            }

                const dragIndex = item.index;
                const hoverIndex = index;
        
               // Не менять карты сами с собой
                if (dragIndex === hoverIndex) {
                    return;
                }
                // определяет размеры карты
                const hoverBoundingRect = ref.current?.getBoundingClientRect();
    
                // Определяет половину высоты
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                // Определяет позицию мышки
                const clientOffset = monitor.getClientOffset();
                // Пиксели до вершины карты
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        
                // Начинать движение только если мышка прошла половину высоты
                // Тянуть вниз, только если курсор ниже 50%
                // Тянуть вверх, только если курсор выше 50%
    
                // Dragging вниз    
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                  }
                // Dragging вверх
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
          
                // Перемещение карт
                moveCard(dragIndex, hoverIndex);
                               
                item.index = hoverIndex;                          
        },

    });
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id, text, index, left, top},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (<div ref={ref} style={{ ...style, opacity }}>
			{text}
		</div>);
};