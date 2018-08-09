export default function(state=null, action){
    switch(action.type){
        case "SEARCH_CRITERIA":
            console.log(action.payload);
            return action.payload;
            break;
    }

    return state;
}

