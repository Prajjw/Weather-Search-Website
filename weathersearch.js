const weather={
    apiKey:"9e36a7890f19cd0deaf5ef2f15a6a9a8",
    fetchWeather: async function(city){
        const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather.apiKey}&units=metric`)
        try{
            const data=await res.json();
            weather.displayWeather(data)
        }
        catch(e){
            console.log(e)
            document.querySelector('.temp').innerText='Something went wrong :(';
        }
    },
    displayWeather:function(data){
        const name=data.name;
        const {icon,description}=data.weather[0];
        const {temp,humidity}=data.main;
        const {speed}=data.wind;
        // console.log(lon,lat,name,icon,description,temp,humidity,speed)
        document.querySelector('.city').innerText=`Weather in ${name}`;
        document.querySelector('.temp').innerText=`${temp}° C`;
        document.querySelector(".description").innerText=description;
        document.querySelector(".humidity").innerText=`Humidity: ${humidity}%`;
        document.querySelector(".windSpeed").innerText=`WindSpeed: ${speed}Km/hr`;
        document.querySelector(".icon").src=`https://openweathermap.org/img/wn/${icon}@2x.png`;

    }
}
function search(){
    document.querySelector(".weather").style.display='block';
    const searchbar=document.querySelector('.search-bar');
    weather.fetchWeather(searchbar.value);
    document.body.style.backgroundImage=`url('https://source.unsplash.com/1600x900/?${searchbar.value}')`;
    searchbar.value="";
}
document.querySelector(".searchButton").addEventListener("click",()=>{
    search();
})
document.querySelector('.search-bar').addEventListener('keyup',(event)=>{
    if (event.key=="Enter"){
        search();
    }
})
