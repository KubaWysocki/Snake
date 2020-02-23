import React from 'react'

const Inputs = props =>
    Object.keys( props.authData ).map( key =>
        <React.Fragment key={ key }>
            <input 
                id={ key }
                placeholder={ key } 
                value={ props.authData[key] }
                type={ key === 'password' ? 'password' : 'text' }
                onChange={ e => props.change( e, key )}
                onKeyDown={ e => e.key === 'Enter' && props.login() }
            />
            <label htmlFor={ key }>{ key }</label>
        </React.Fragment>
    )
export default Inputs