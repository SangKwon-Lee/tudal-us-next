export function getCookieSearch(name: string) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : "";
}

export function setCookieSearch(name: string, value: string, exp: number) {
  let item = getCookieSearch("search");
  let itemsArr = item.split(",");
  for (let i = 0; i < itemsArr.length; i++) {
    if (itemsArr[i] === value) {
      return;
    }
  }
  var date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  if (item) {
    if (itemsArr.length > 6) {
      itemsArr.shift();
      itemsArr.push(value);
      let newItems = itemsArr.join(",");
      document.cookie =
        name + "=" + newItems + ";expires=" + date.toUTCString() + ";path=/";
    } else {
      let items = item + "," + value;
      document.cookie =
        name + "=" + items + ";expires=" + date.toUTCString() + ";path=/";
    }
  } else {
    document.cookie =
      name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
  }
}

export function deleteCookieSearch(value: any) {
  let itemsArr = getCookieSearch("search").split(",");
  let newArr = itemsArr.filter((data: any) => data !== value);
  var date = new Date();
  date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
  let newItems = newArr.join(",");
  document.cookie =
    // eslint-disable-next-line no-useless-concat
    "search" + "=" + newItems + ";expires=" + date.toUTCString() + ";path=/";
}
