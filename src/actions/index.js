export const addDemoCard = url => ({ type: "ADD_DEMO_CARD", payload: url });
export const onClickPlusDemoCard = index => ({
  type: "ON_CLICK_PLUS",
  payload: index
});
export const onClickMinusDemoCard = index => ({
  type: "ON_CLICK_MINUS",
  payload: index
});
export const onClickPin = index => ({
  type: "ON_CLICK_PIN",
  payload: index
});
export const saveReply = payload => ({
  type: "SAVE_REPLY",
  payload
});
export const updateReply = payload => ({
  type: "UPDATE_REPLY",
  payload
});
//function to delete a reply
export const deleteReply = payload => ({
  type: "DELETE_REPLY",
  payload
});
//function to save pdf url
export const savePdfURL = payload => ({
  type: "ADD_NEW_PDF_URL",
  payload
});
//function to save new tags in the store
export const saveTags = payload => ({
  type: "SAVE_TAGS",
  payload
});
//function to clear all the video resource
export const clearAllVideoResource = payload => ({
  type: "CLEAR_DEMO_CARD",
  payload
});
//function to add new highlight in the url
export const saveHighlights = payload => ({
  type: "SAVE_HIGHLIGHTS",
  payload
});
//function to add new tags in existing tag list
export const addNewTag = payload => ({
  type: "ADD_NEW_TAG",
  payload
});
//function to save tag apitype in case of 200 it will be true else false
export const saveTagApiType = payload => ({
  type: "SAVE_INITIAL_PDF_CORE",
  payload
});

//function to add new url with empty highlights
export const addTestHighlightUrl = payload => ({
  type: "ADD_HIGHLIGHT_URL",
  payload
});
//function to save Collections
export const saveCollections = payload => ({
  type: "SAVE_COLLECTIONS",
  payload
});
export const saveSelectedCollection = payload => ({
  type: "SAVE_SELECTED_COLLECTION",
  payload
});
