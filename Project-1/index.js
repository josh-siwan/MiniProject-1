const key = 'DEMO_KEY' //'aVm6Awk87aziAdctKxmPoeCxULdzt2klD46C3eFR'

const url = 'https://api.nasa.gov/insight_weather/?api_key='+key +'&feedtype=json&ver=1.0'
//https://api.nasa.gov/curiosity_weather/?api_key=DEMO_

let arrDates = []

function getPastWeek () {
    fetch('https://api.covidtracking.com/v1/us/daily.json')
    .then(res => res.json())
    .then(data => {

        console.log(data)
        
        for (let i=6; i>=0; i--) {
            

            date = data[i].dateChecked
            newDateYear = date.slice(0,4)
            newDateMonth = date.slice(5,7)
            newDateDay = date.slice(8,10)

            const covidDate = new Date(newDateYear,newDateMonth-1,newDateDay,0,0,0)
       
            finalDate = covidDate.toString().slice(0,15)

            document.getElementById("Date-"+i).innerHTML = finalDate // "Date: " + data[i].date
            document.getElementById("positivie-"+i).innerHTML = "Positive: " + data[i].positive.toLocaleString("en-US");
            document.getElementById("deathTotal-"+i).innerHTML = "Total Deaths: " + data[i].death.toLocaleString("en-US");
            document.getElementById("deathIncrease-"+i).innerHTML = "Death Increase: " + (data[i].deathIncrease).toLocaleString("en-US");
            
            
        }
        
    })

}

function getCurrentDay () {
    fetch('https://api.covidtracking.com/v1/us/current.json')
    .then(res => res.json())
    .then(data => {
        console.log(data[0].date)
        document.getElementById("day").innerHTML =  data[0].date
        document.getElementById("positive").innerHTML =  (data[0].positive).toLocaleString("en-US");
        
    })

}

function generateData() {
    let myChart = echarts.init(document.getElementById("productsChart"),'dark');

    fetch('https://api.covidtracking.com/v1/us/daily.json')
    .then(res => res.json())
    .then(data => {

        console.log(data)
        let positivePerDate = new Map ();
        for (let i=6; i>=0; i--) {
            
            value = data[i].positive.toLocaleString("en-US");
            newVal = value.slice(3,10)
            newNum = newVal.replaceAll(',','')
            console.log(newNum)
           
           positivePerDate.set(data[i].date, newNum)

            
        }
        console.log(Array.from(positivePerDate.values()))
        myChart.setOption({
            title: {
              text: "Products per categories",
            },
            tooltip: {},
            legend: {
              data: ["Categories"],
            },
            xAxis: {
              data: Array.from(positivePerDate.keys())//[],
            },
            yAxis: {},
            series: [
              {
                name: "Categories",
                type: "bar",
                data:  Array.from(positivePerDate.values()) // ,
              },
            ],
          });

    })
}

function getHistoricalData() {
  

  fetch('https://api.covidtracking.com/v1/us/daily.json')
    .then(res => res.json())
    .then(data => { 
       let dates = []
       let deaths = []
      for(let i=0; i<data.length; i++) {
        dates.push(data[i].date)
        deaths.push(data[i].death)
      }
      reverseDates = dates.reverse()
      reverseDeaths = deaths.reverse()
      console.log(reverseDeaths)

      var dom = document.getElementById('container');
    var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    
    var option;

    option = {
  xAxis: {
    type: 'category',
    data: reverseDates,
    name: 'Dates'
  },
  yAxis: {
    type: 'value',
    name: 'Deaths'
  },
  series: [
    {
      data: reverseDeaths,
      type: 'line'
    }
  ]
};

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);


    })


  }

// function redirect() {
//   document.getElementById('blogPage').addEventListener('click')
// }
  
function clickedButton() {
  window.location = '../OtherPages/blogPage.html'

}



// https://api.covidtracking.com/v1/us/current.json



getPastWeek()
getCurrentDay()
generateData()
getHistoricalData()
//console.log(positivePerDate)