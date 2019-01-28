import React from 'react'

const Inputs = ( props ) => {
    const keys = Object.keys( props.authData )
    return (
        keys.map( key => {
            return <input 
                        key={ key } 
                        className={ key } 
                        placeholder={ key } 
                        value={ props.authData[key] }
                        type={ key === 'Password' ? 'password' : 'text' }
                        onChange={ e => props.change( e, key )}
                    />
        })
    )
}
export default Inputs