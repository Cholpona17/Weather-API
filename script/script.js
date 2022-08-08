const API = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = '&appid=93b561229d2f2808073fae34ea32fcb7'
const form = document.querySelector('.search_city')
const input = document.querySelector('#inp')
input.classList.add('style_inp')
const output = document.querySelector('.output')


const getWeather = async () => {
    const url = API + input.value + key
    const request = await fetch(url)
    const response = await request.json()
    renderWeather(response);
    input.value = ''
    getMap(response.coord)
}

const renderWeather = (data) => {
    output.innerHTML = ''
    console.log(data);
    const name = document.createElement('h1')
    name.classList.add('style_name')
    name.textContent = data.name
    const temp = document.createElement('h2')
    temp.classList.add('style_temp')
    temp.textContent = Math.floor(data.main.temp - 273.15) + 'C'
    const temp2 = document.createElement('h2')
    temp2.classList.add('style_temp2')
    temp2.textContent = Math.floor(data.main.temp - 273.15) * 1.8 + 32 + 'F'
    const windDeg = document.createElement('h2')
    windDeg.classList.add('style_deg')
    windDeg.textContent = data.wind.deg + ' deg'
    const windGust = document.createElement('h2')
    windGust.classList.add('style_gust')
    windGust.textContent = data.wind.gust + ' guest'
    const windSpeed = document.createElement('h2')
    windSpeed.classList.add('style_speed')
    windSpeed.textContent = data.wind.speed + ' speed'
    const main = document.createElement('h2')
    main.classList.add('style_main')
    main.textContent = 'описание погоды: ' + data.weather[0].main

    const box = document.createElement('div')
    box.classList.add('style_box')
    box.append(name, temp, temp2, windDeg, windGust, windSpeed, main)
    output.append(box)
}

const getMap = ({ lat, lon }) => {
    let map = document.createElement('div')
    map.id = 'map'

    DG.then(function () {
        map = DG.map('map', {
            center: [lat, lon],
            zoom: 13
        });
        DG.marker([lat, lon]).addTo(map).bindPopup('Вы кликнули по мне!');
    })
    output.append(map)
}


form.addEventListener('submit', (event) => {
    event.preventDefault()
    getWeather()
})