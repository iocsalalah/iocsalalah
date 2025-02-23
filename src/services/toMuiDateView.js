export let toMuiDateView = (dateParam) => {
  if (!dateParam || !dateParam.length) {
    return undefined;
  }
  return dateParam.substring(0, 10);
};
