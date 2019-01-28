import React from 'react';
import './Controls.css'

const Controls = props => (
    <div className='controlPanel'>
        <div className='up arrow' onClick={()=>props.controls('n')}></div>
        <div className='arrow' onClick={()=>props.controls('w')}></div>
        <div className='right arrow' onClick={()=>props.controls('e')}></div>
        <div className='down arrow' onClick={()=>props.controls('s')}></div>
    </div>
);
export default Controls;