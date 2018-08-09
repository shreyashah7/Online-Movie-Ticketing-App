export default function(state=null, action){
    switch(action.type){
        case "DONE_BOOKING":
            console.log(action.payload);
            return action.payload;
            break;
    }

    return state;
}
