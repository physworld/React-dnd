import React, { useEffect } from 'react'
import { ItemTypes } from './ItemTypes'
import { useDrag } from 'react-dnd'
import {jsPlumb} from 'jsplumb'
const style = {
    position: 'absolute',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '2rem 4rem',
    cursor: 'move'
}

export const Box = ({ id, left, top, hideSourceOnDrag, children}) => {
        useEffect(() => {
            jsPlumb.draggable(String(id), {
                containment:true
             });
    
            let exampleGreyEndpointOptions = {
                isSource: true,
                endpoint: "Dot",
                paintStyle: {width:20, height:20, fill:'black'},
                isTarget: true,
                connectorStyle: {stroke: '#666'}
        
            };
            jsPlumb.addEndpoint(String(id), {anchors: "Right"}, exampleGreyEndpointOptions);
            jsPlumb.addEndpoint(String(id), {anchors: "Top"}, exampleGreyEndpointOptions);
            jsPlumb.addEndpoint(String(id), {anchors: "Left"}, exampleGreyEndpointOptions);
            jsPlumb.addEndpoint(String(id), {anchors: "Bottom"}, exampleGreyEndpointOptions);        
        }, [])
    const [{ isDragging }, drag] = useDrag({
        item: { id, left, top, type: ItemTypes.CARD },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag}/>;
    }
    return (<div id={String(id)} ref={drag} style={{ ...style, left, top }}>
			{children}
		</div>);
};
