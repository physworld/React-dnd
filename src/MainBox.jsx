import React, { useState } from 'react';
import BigBox from './Example'
import ListOfCards from './ListOfCards'
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const styles = {
    display: 'flex',
    
  }
  export function MainBox(){
//   Карты в стобце
const [cards, setCards] = useState([ {
    id: 1,
    top: null,
    left: null,
    text: 'Write a cool JS library'
},
{
    id: 2,
    top: null,
    left: null,
    text: 'Make it generic enough'
},
{
    id: 3,
    top: null,
    left: null,
    text: 'Write README'
},
{
    id: 4,
    top: null,
    left: null,
    text: 'Create some examples'
},
{
    id: 5,
    top: null,
    left: null,
    text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)'
},
{
    id: 6,
    top: null,
    left: null,
    text: '???'
},
{
    id: 7,
    top: null,
    left: null,
    text: 'PROFIT'
},]);
  // Карты в боксе
const [cardsInBox, setCardsInBox] = useState(
    []);


// Функция добавляет карту в бокс
function pushNewCardInBox(card){
    const id = String(cardsInBox.length);
    setCardsInBox(update(cardsInBox, {
     [id]: {
            $set: { id: card.id, top: card.top, left: card.left, title: card.text},
        },
    }));

}

    return(
        <div style={styles}>
            <DndProvider backend = {HTML5Backend}>
                <ListOfCards cards={cards} setCards={setCards}/>
                <BigBox cardsInBox={cardsInBox} setCardsInBox={setCardsInBox} pushNewCardInBox={pushNewCardInBox}/>
            </DndProvider>
        </div>
       
    )
}