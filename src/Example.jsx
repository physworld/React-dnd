import React, { useState, useCallback } from 'react';
import { Container } from './Container';
export default function Example({cardsInBox, setCardsInBox, pushNewCardInBox}){
	//Функционал галочки внизу страницы
    const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true);
    const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
        hideSourceOnDrag,
	]);
	//Рендерит контейнер и бокс с галочкой
    return (<div>
			<Container hideSourceOnDrag={hideSourceOnDrag} cardsInBox={cardsInBox} setCardsInBox={setCardsInBox} pushNewCardInBox={pushNewCardInBox}/>
			<p>
				<label htmlFor="hideSourceOnDrag">
					<input id="hideSourceOnDrag" type="checkbox" checked={hideSourceOnDrag} onChange={toggle}/>
					<small>Hide the source item while dragging</small>
				</label>
			</p>
		</div>);
};
