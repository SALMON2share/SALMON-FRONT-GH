const initialState = {
  listDemoCards: []
};
/**
 * function to sort the resources
 */
function sortResource(temp) {
  let sorted = temp.filter(item => item.pinLocation === false);
  let pinned = temp.filter(item => item.pinLocation === true);
  sorted.sort((a, b) => {
    return b.count - a.count;
  });
  pinned.sort((a, b) => {
    return b.count - a.count;
  });
  // Merge stay items and sorted items
  var result = pinned.concat(sorted);
  return result;
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DEMO_CARD":
      if (
        state.listDemoCards.filter(row => row.url === action.payload).length > 0
      ) {
        return state;
      } else {
        state.listDemoCards.push({
          url: action.payload,
          pinLocation: false,
          like: false,
          dislike: false,
          count: 0
        });
        return state;
      }

    case "ON_CLICK_PLUS":
      let temp = state.listDemoCards.slice();
      console.log("list card is", temp, action.payload);
      let index = action.payload;
      temp[index].count = temp[index].count + 1; //comment this line of code to like only once
      temp[index].like = true;
      temp[index].dislike = false;
      let result = sortResource(temp);
      return {
        ...state,
        listDemoCards: result
      };
    case "ON_CLICK_MINUS":
      temp = state.listDemoCards.slice();
      index = action.payload;
      temp[index].count = temp[index].count - 1; //comment this line of code to like only once
      temp[index].like = true;
      temp[index].dislike = false;
      result = sortResource(temp);
      return {
        ...state,
        listDemoCards: result
      };
    case "ON_CLICK_PIN":
      temp = state.listDemoCards.slice();
      index = action.payload;
      temp[index].pinLocation = !temp[index].pinLocation;
      result = sortResource(temp);
      return {
        ...state,
        listDemoCards: result
      };
    default:
      return state;
  }
};

export default rootReducer;
