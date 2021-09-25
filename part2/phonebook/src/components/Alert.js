import React from 'react'

const AlertBox = ({ name, action }) => {

    let content = null
    const boxStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    }

    switch (action) {
        case "add":
            content = (
                <div style={boxStyle}>
                    Added {name} to the phonebook
                </div>
            )
            break
        case "update":
            content = (
                <div style={boxStyle}>
                    Updated {name}'s number in the phonebook
                </div>
            )
            break
        case "delete":
            content = (
                <div style={boxStyle}>
                    Deleted {name} from the phonebook
                </div>
            )
            break
        case "deleted":
            content = (
                <div style={boxStyle}>
                    {name} has already been deleted from the phonebook
                </div>
            )
            break
        default:
            content = null
    }

    return content
}

export default AlertBox