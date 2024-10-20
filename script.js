const submitbutton=document.getElementById("submitbutton");
const inputbox=document.getElementById("inputbox");
const apiKey='3fac23c6ecdf444cb4134828242507';
const details=document.querySelector(".details");
const weatherlogo=document.getElementById("weatherlogo");

submitbutton.addEventListener("click", async event =>{

    event.preventDefault();
    const city=inputbox.value;
    if(city)
    {
        const weatherData=await getWeatherdata(city);
        displayWeather(weatherData);
    }
});

async function getWeatherdata(city)
{
    const apiUrl="https://api.weatherapi.com/v1/current.json?key=";
    const response= await fetch(apiUrl+`${apiKey}&q=${city}`);
    return await response.json();
}

function displayWeather(data)
{
    document.querySelector(".intro").style.display="none";
    
    document.getElementById("citytitle").innerHTML = data.location.name;
    document.getElementById("temp-info").innerHTML= data.current.temp_c + '°C';
    document.getElementById("logo-info").innerHTML=data.current.condition.text;
    document.getElementById("humidity-val").innerHTML=data.current.humidity + '%';
    document.getElementById("wind-val").innerHTML=data.current.gust_kph + ' kph';

    if(data.current.condition.code==1000)
    {
        if(data.current.condition.text=="Sunny")
        {
            weatherlogo.src='Create/sunny.png';
        }
        else  weatherlogo.src='Create/moon.png';
    }
    else if(data.current.condition.code>=1003 && data.current.condition.code<=1030)
    {
        weatherlogo.src='Create/sun(1).png';
    }
    else if((data.current.condition.code>=1180 && data.current.condition.code<=1201) || data.current.condition.code==1063 || (data.current.condition.code>=1240 && data.current.condition.code<=1246))
    {
        weatherlogo.src='Create/downpour.png';
    }
    else if((data.current.condition.code>=1273 && data.current.condition.code<=1276) || data.current.condition.code==1087)
    {
        weatherlogo.src='Create/rainy.png';
    }
    else 
    {
        weatherlogo.src='Create/snow-storm.png';
    }
    document.querySelector(".details").style.display="block";
}