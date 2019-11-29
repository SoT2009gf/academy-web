var pageStyle;

if (localStorage.pageStyle) {
    pageStyle = JSON.parse(localStorage.pageStyle);
} else {
    pageStyle = { "style": "light" };
}

const $btChangeStyle = $("button");
const $body = $("body");
const $links = $("a");

if (pageStyle.style == "dark") {
    $body.toggleClass("light");
    $body.toggleClass("dark");
    $links.toggleClass("light");
    $links.toggleClass("dark");
    $btChangeStyle.toggleClass("hidden");
}

$btChangeStyle.click(function (event) {
    event.preventDefault();
    if (pageStyle.style == "light") {
        pageStyle.style = "dark";
    } else {
        pageStyle.style = "light";
    }
    localStorage.pageStyle = JSON.stringify(pageStyle);
    $body.toggleClass("light");
    $body.toggleClass("dark");
    $links.toggleClass("light");
    $links.toggleClass("dark");
    $btChangeStyle.toggleClass("hidden");
});

$.getJSON("http://api.openweathermap.org/data/2.5/weather",
    { lat: 51.5085, lon: -0.1258, units: "metric", APPID: "8641355d0bdfa52a49f4e9a42560adf0" },
    function (data) {
        const weatherInfoFormatted = `<div>Teplota: ${data.main.temp} &deg;C<br/>Tlak: ${data.main.pressure} hPa<br/>Oblačnosť: ${data.clouds.all} %<br/>Rýchlosť vetra: ${data.wind.speed} m/s<br/>Vlhkosť: ${data.main.humidity} %</div>`;
        $("#weatherinfo").append(weatherInfoFormatted);
});