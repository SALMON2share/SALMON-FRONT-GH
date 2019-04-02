/**
 * format of reply for each testHighLights will be like as
 * reply:[
 * {
 *  username:string(unique),
 *  comment:string,
 *  isPublic:boolean
 * }
 * ]
 */
const initialState = {
  listDemoCards: [],
  cookies: null,
  testHighlights: null,
  pdfURL: "https://arxiv.org/pdf/cs/0408001.pdf",
  tags: null,
  isInitial: null,
  collections: null,
  selectedCollection: null
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
    case "CLEAR_DEMO_CARD":
      let demoCards = state.listDemoCards.filter(
        row => row.pinLocation !== false || row.like !== false
      );
      return {
        ...state,
        listDemoCards: demoCards
      };
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
    case "SAVE_REPLY":
      console.log(
        "url in save reply",
        action.payload.url,
        state.testHighlights
      );
      let highlightsTemp = state.testHighlights[action.payload.url].slice();
      index = highlightsTemp.findIndex(row => row.id === action.payload.id);
      highlightsTemp[index].reply.push(action.payload.reply);
      return {
        ...state,
        testHighLights: highlightsTemp
      };
    case "UPDATE_REPLY":
      highlightsTemp = state.testHighlights[action.payload.url].slice();
      index = highlightsTemp.findIndex(row => row.id === action.payload.id);
      highlightsTemp[index].reply[action.payload.position] =
        action.payload.reply;
      return {
        ...state,
        testHighLights: highlightsTemp
      };
    case "DELETE_REPLY":
      highlightsTemp = state.testHighlights[action.payload.url].slice();
      index = highlightsTemp.findIndex(row => row.id === action.payload.id);
      let tempReply = highlightsTemp[index].reply.slice();
      highlightsTemp[index].reply = tempReply
        .slice(0, action.payload.position)
        .concat(tempReply.slice(action.payload.position + 1, tempReply.length));
      return {
        ...state,
        testHighLights: highlightsTemp
      };
    case "SAVE_COOKIE":
      return {
        ...state,
        cookies: action.payload
      };
    case "ADD_NEW_PDF_URL":
      return {
        ...state,
        pdfURL: action.payload
      };
    case "SAVE_HIGHLIGHTS":
      temp = {};
      temp = state.testHighlights !== null ? state.testHighlights : {};
      temp[action.payload.pdfURL] = action.payload.highlights;
      return {
        ...state,
        testHighlights: temp
      };
    case "SAVE_TAGS":
      return {
        ...state,
        tags: action.payload
      };
    case "ADD_NEW_TAG":
      temp = state.tags;
      temp[action.payload.key] = action.payload.value;
      return {
        ...state,
        tags: temp
      };
    case "SAVE_INITIAL_PDF_CORE":
      return {
        ...state,
        isInitial: action.payload
      };
    case "ADD_HIGHLIGHT_URL":
      let obj = {};
      obj[action.payload] = [];
      console.log("add the new url", obj);
      return {
        ...state,
        testHighlights: obj
      };
    case "SAVE_COLLECTIONS":
      return {
        ...state,
        collections: action.payload
      };
    case "SAVE_SELECTED_COLLECTION":
      return {
        ...state,
        selectedCollection: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
