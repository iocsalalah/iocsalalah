export let toDateView = (dateParam) => {
  if (!dateParam || !dateParam.length) {
    return undefined;
  }

  let date = new Date(dateParam);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return (dateParam = dd + "/" + mm + "/" + yyyy);
};
