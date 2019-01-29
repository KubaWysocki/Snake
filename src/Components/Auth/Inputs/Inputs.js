import React from 'react'

const Inputs = ( props ) => {
    const keys = Object.keys( props.authData )
    return (
        keys.map( key => {
            return <React.Fragment key={ key }>
                        <input 
                            id={ key }
                            placeholder={ key } 
                            value={ props.authData[key] }
                            type={ key === 'Password' ? 'password' : 'text' }
                            onChange={ e => props.change( e, key )}
                        />
                        <label htmlFor={ key }>{key}</label>
                    </React.Fragment>
        })
    )
}
export default Inputs