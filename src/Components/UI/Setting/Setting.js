import React from 'react'

const Setting = ( props ) => {
    let keys = Object.keys( props.options )
    const check = option => JSON.stringify( props.checkedValue ) === JSON.stringify( option )
    return (
        <div>
            <p>{ props.children }</p>
            { keys.map( el => (
                <React.Fragment key={ el }>
                    <input type='radio' id={ el } name={ keys.join(',') }
                        onChange={ () => { props.change( props.options[ el ] )}} 
                        defaultChecked={ check( props.options[ el ] )}/>
                    <label htmlFor={ el }> { el.toUpperCase() } </label>
                </React.Fragment>
            ))}
        </div>
    )
}

export default Setting