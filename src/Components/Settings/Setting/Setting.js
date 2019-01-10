import React from 'react';

const Setting = ( props ) =>{
    let keys = Object.keys( props.options );
    const check = option => JSON.stringify( props.checkedValue ) === JSON.stringify( option );
    return(
        <div>
            <p>{ props.children }</p>

            <input type='radio' id={ keys[0] } name={ keys[0] } 
                onChange={ () => { props.change( props.options[ keys[0] ] )}} 
                defaultChecked={ check( props.options[ keys[0] ] )}/>
            <label htmlFor={ keys[0] } > { keys[0].toUpperCase() } </label>

            <input type='radio' id={ keys[1] } name={ keys[0] } 
                onChange={ () => { props.change( props.options[ keys[1] ] )}} 
                defaultChecked={ check( props.options[ keys[1] ] )}/>
            <label htmlFor={ keys[1] } > { keys[1].toUpperCase() } </label>

            {keys[2] ?
            <>
            <input type='radio' id={ keys[2] } name={ keys[0] } 
                onChange={ () => { props.change( props.options[ keys[2] ] )}} 
                defaultChecked={ check( props.options[ keys[2] ] )}/>
            <label htmlFor={ keys[2] } > { keys[2].toUpperCase() } </label>
            </> :
            null
            }
        </div>
    )
}
export default Setting;