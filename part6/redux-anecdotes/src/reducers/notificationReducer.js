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

let removeNoti

export const setNoti = (anecdote, type, timer) => {
    return async dispatch => {
        dispatch({
            type,
            data: {
                anecdote: anecdote
            }
        })
        clearTimeout(removeNoti)
        removeNoti = setTimeout(() => dispatch({
            type: "REMOVE"
        }), timer)
    }
}

export default reducer