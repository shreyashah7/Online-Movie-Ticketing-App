export default function(state=[], action){
    switch(action.type){
        case "SELECTED_TRACE":
            console.log(action.payload);
            return action.payload;
            break;
    }

    return state;
}
