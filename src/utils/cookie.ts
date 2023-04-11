export function setCookie(
  name: string,
  value: string,
  day: number,
  domain: string
) {
  var date = new Date();
  date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
  document.cookie =
    name +
    "=" +
    value +
    ";expires=" +
    date.toUTCString() +
    ";path=/" +
    ";domain=" +
    domain;
}

export function getCookie(name: string) {
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((cookie) => cookie.trim().startsWith(`${name}=`));
  if (cookie) {
    return cookie.trim().slice(name.length + 1);
  }
  return undefined;
}
