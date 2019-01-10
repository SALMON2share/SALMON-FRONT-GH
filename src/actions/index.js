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
export const deleteReply = payload => ({
  type: "DELETE_REPLY",
  payload
});
export const savePdfURL = payload => ({
  type: "ADD_NEW_PDF_URL",
  payload
});
export const saveTags = payload => ({
  type: "SAVE_TAGS",
  payload
});
export const clearAllVideoResource = payload => ({
  type: "CLEAR_DEMO_CARD",
  payload
});
