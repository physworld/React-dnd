import React from 'react'
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Box } from './Box';
import update from 'immutability-helper';
const styles = {
    width: '85vw',
    height: '100vh',
    border: '1px solid black',
    position: 'relative',
};
//Начальные боксы
export const Container = ({hideSourceOnDrag, cardsInBox, setCardsInBox, pushNewCardInBox}) => {
//Проверяет на совпадение ID нового бокса с остальными. Если есть совпадение, выбирает случайный от 1 до 100
    function checkID(item){
       cardsInBox.forEach(card => {
           if(card.id === item.id){
           const min = Math.ceil(1);
           const max = Math.floor(100);
            item.id = Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
            checkID(item);
           }
       });
        }

    
    const [, drop] = useDrop({
        accept: ItemTypes.CARD, 
        drop(item, monitor) {
           //Если left не существует, значит карточку
           //только перетащили. Добавить карточку 
           //в бокс
            if(!item.left && item.left !== 0)
                {
                    checkID(item);
                    item.left = 0;
                    item.top = 0;
                    pushNewCardInBox(item)
                }
            //Перемещаем карточку если она уже была в боксе
            else
                {
                const delta = monitor.getDifferenceFromInitialOffset();
                const left = Math.round(item.left + delta.x);
                const top = Math.round(item.top + delta.y);
            //Находит перетаскиваемую карту в массиве карт и передвигает её
                cardsInBox.forEach(el => {
                    if(el.id === item.id)
                     moveBox(cardsInBox.indexOf(el), left, top);
                    })
                }
 
            return undefined;
        },
    });
    const moveBox = (id, left, top) => {
        setCardsInBox(update(cardsInBox, {
            [id]: {
                $merge: { left, top },
            },
        }));
    };

    return (<div ref={drop} style={styles}>
			{cardsInBox.map((card) => {
        const { id, left, top, title } = card;
        
        return (<Box key={cardsInBox.indexOf(card)} id={id} left={left} top={top} hideSourceOnDrag={hideSourceOnDrag} cardsInBox={cardsInBox}>
						{title}
                    </Box>
                    );

                    
    })}
		</div>);
};
