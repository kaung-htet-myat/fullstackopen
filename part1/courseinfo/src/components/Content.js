import React from 'react'

const Content = (props) => {
    return (
        <div>
            <p>
                {props.parts[0]} {props.exercises[0]}
            </p>
            <p>
                {props.parts[1]} {props.exercises[1]}
            </p>
            <p>
                {props.parts[2]} {props.exercises[2]}
            </p>
        </div>
    )
}

export default Content;