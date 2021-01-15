import React, { useCallback} from 'react';
import { Card } from './Card';
import update from 'immutability-helper';
const style = {
   width: '15vw'
};

//Массив карт
export default function Container2({cards, setCards}){
        //Функция, которая меняет карты в колонке
        const moveCard = useCallback((dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(update(cards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }));
        }, [cards, setCards]);


        //Функция, которая отрисовывает карту в колонке
        const renderCard = (card, index) => {
            return (<Card  key={card.id} index={index} id={card.id} text={card.text} left={card.left} top={card.top} moveCard={moveCard}/>);
        };
        //Возвращает столбец карт
        return (<>
				<div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
			</>);
};