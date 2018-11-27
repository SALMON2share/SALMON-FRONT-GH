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
