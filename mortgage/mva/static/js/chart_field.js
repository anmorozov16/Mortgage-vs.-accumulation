var mortgageColor = window.getComputedStyle(document.querySelector('.mortgage')).getPropertyValue('color');
var accumulationColor = window.getComputedStyle(document.querySelector('.accumulation')).getPropertyValue('color');

var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        //labels: labels,
        datasets: [{
            label: 'mortgage',
            borderWidth: 1,
            borderColor: mortgageColor,
            fill: false,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
        },
        {
            label: 'accumulation',
            borderWidth: 1,
            borderColor: '#8bc34a',
            fill: false,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
