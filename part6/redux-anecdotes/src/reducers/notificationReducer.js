const reducer = (state=null, action) => {
    switch(action.type){
        case "CREATE":
            return `You created '${action.data.anecdote}''`
        case "VOTING":
            return `You voted '${action.data.anecdote}''`
        case "REMOVE":
            return null
        default:
            return state
    }
}

export const showNoti = (anecdote, type) => {
    return ({
        type: type,
        data: {
            anecdote: anecdote
        }
    })
}

export const removeNoti = () => {
    return ({
        type: "REMOVE"
    })
}

export default reducer