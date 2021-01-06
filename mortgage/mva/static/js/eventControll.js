function discharge(value){
    return String(value.replace(/[^0-9.]/g,'')).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


function round(x, r) {
    return Math.round(x * r) / r;
}


function updateChart(updateMortage=true, updateAccumulation=true) {
    if (updateMortage) {
        var mort = mortgage(income, housingCost, mortgageRate, term, spendingsMortgage);
        profitMortgageDoc.innerHTML = discharge(round(mort['Profit'], 100).toString());
        mortgageMonthlyPaymentDoc.innerHTML = discharge(round(mort['Mortgage monthly payment'], 100).toString());

        if (mort['Profit'] < 0) {
            profitMortgageDoc.innerHTML = '-' + profitMortgageDoc.innerHTML
            profitMortgageDoc.style.color = 'red'
        } else
            profitMortgageDoc.style.color = ''

        overpayment.innerHTML = discharge(round(mort['Overpayment'], 100).toString());
        myChart.data.datasets[0].data = mort['Profit array'];
    }
    if (updateAccumulation) {
        var accum = accumulation(income, housingCost, inflationRate, term, spendingsAccumulation);
        var profit = accum['Profit array'][accum['Profit array'].length - 1]
        profitAccumulationDoc.innerHTML = discharge(round(profit, 100).toString());

        if (profit < 0) {
            profitAccumulationDoc.innerHTML = '-' + profitAccumulationDoc.innerHTML
            profitAccumulationDoc.style.color = 'red'
        } else
            profitAccumulationDoc.style.color = ''

        myChart.data.datasets[1].data = accum['Profit array'];
    }
    myChart.update()
}


var mortgageRateDoc = document.getElementById('Mortgage rate');
var housingCostDoc = document.getElementById('Housing cost');
var incomeDoc = document.getElementById('Income');
var termDoc = document.getElementById('Term');
var spendingsMortgageDoc = document.getElementById('Spendings mortgage');
var spendingsAccumulationDoc = document.getElementById('Spendings accumulation');
var inflationRateDoc = document.getElementById('Inflation rate');

var profitMortgageDoc = document.getElementById('profit mortgage')
var profitAccumulationDoc = document.getElementById('profit accumulation')
var mortgageMonthlyPaymentDoc = document.getElementById('mortgage monthly payment')
var overpayment = document.getElementById('overpayment');

var mortgageRate = parseFloat(mortgageRateDoc.value / 100);
mortgageRateDoc.oninput = () => {
    mortgageRate = parseFloat(mortgageRateDoc.value / 100);
    updateChart(true, false)
}

var housingCost = parseFloat(housingCostDoc.value.replace(/\s/g, ''));
housingCostDoc.oninput = () => {
    housingCostDoc.value = discharge(housingCostDoc.value);
    housingCost = parseFloat(housingCostDoc.value.replace(/\s/g, ''));
    updateChart()
}

var term = parseFloat(termDoc.value);
termDoc.oninput = () => {
    term = parseFloat(termDoc.value);
    var labels = []
    for (var i = 0; i < 12 * term; i+=1)
        labels[i] = (i + 1) + 'm';
    myChart.data.labels = labels;
    updateChart()
}

var income = parseFloat(incomeDoc.value.replace(/\s/g, ''));
incomeDoc.oninput = () => {
    incomeDoc.value = discharge(incomeDoc.value);
    income = parseFloat(incomeDoc.value.replace(/\s/g, ''));
    updateChart()
}

var inflationRate = parseFloat(inflationRateDoc.value) / 100;
inflationRateDoc.oninput = () => {
    inflationRate = parseFloat(inflationRateDoc.value) / 100;
    updateChart(false, true);
}

var spendingsMortgage = parseFloat(spendingsMortgageDoc.value.replace(/\s/g, ''));
spendingsMortgageDoc.oninput = () => {
    spendingsMortgageDoc.value = discharge(spendingsMortgageDoc.value);
    spendingsMortgage = parseFloat(spendingsMortgageDoc.value.replace(/\s/g, ''));
    updateChart(true, false)
}

var spendingsAccumulation = parseFloat(spendingsAccumulationDoc.value.replace(/\s/g, ''));
spendingsAccumulationDoc.oninput = () => {
    spendingsAccumulationDoc.value = discharge(spendingsAccumulationDoc.value);
    spendingsAccumulation = parseFloat(spendingsAccumulationDoc.value.replace(/\s/g, ''));
    updateChart(false, true)
}


var labels = [];
for (var i = 0; i < 12 * term; i+=1)
    labels[i] = (i + 1) + 'm';
myChart.data.labels = labels;
updateChart()

