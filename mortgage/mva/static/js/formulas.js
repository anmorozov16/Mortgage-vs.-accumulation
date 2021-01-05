function mortgage(income, mortgage_sum, rate, term, spendings) {
//    income > annual_pay -> profit > 0

    var rate_per_month = rate/12
    var annual_pay = mortgage_sum*(rate_per_month*(1+rate_per_month)**(term*12)/((1+rate_per_month)**(term*12)-1))
    var overpayment = annual_pay*term*12 - mortgage_sum
    var profit = (income - annual_pay - spendings)*term*12

    cumsum_income = [];
    for(var a=0;a<term*12;a++) {
      if(a==0) cumsum_income[a] = income;
      else cumsum_income[a] = cumsum_income[a-1] + income;
    }
    console.log(cumsum_income)

    cumsum_annual_pay = [];
    for(var a=0;a<term*12;a++) {
      if(a==0) cumsum_annual_pay[a] = annual_pay;
      else cumsum_annual_pay[a] = cumsum_annual_pay[a-1] + annual_pay;
    }
    console.log(cumsum_annual_pay)

    cumsum_spendings = [];
    for(var a=0;a<term*12;a++) {
      if(a==0) cumsum_spendings[a] = spendings;
      else cumsum_spendings[a] = cumsum_spendings[a-1] + spendings;
    }
    console.log(cumsum_spendings)

    var cumsum_profit = cumsum_income.map(function(item, index) {
      return item - cumsum_annual_pay[index];})

    var cumsum_profit_final = cumsum_profit.map(function(item, index) {
      return item - cumsum_spendings[index];})

    console.log(cumsum_profit_final)

    return cumsum_profit_final
}

function accumulation(income, apt_sum, inflation_rate, term, spendings) {
    var FV = apt_sum*(1+inflation_rate)
    var accum = (income-spendings)*term*12

    cumsum_accum = [];
    for(var a=0;a<term*12;a++) {
      if(a==0) cumsum_accum[a] = accum/(term*12);
      else cumsum_accum[a] = cumsum_accum[a-1] + accum/(term*12);
    }
    console.log(cumsum_accum)

    cumsum_FV = [];
    for(var a=0;a<term*12;a++) {
      if(a==0) cumsum_FV[a] = (apt_sum*(1+inflation_rate/12) - apt_sum);
      else cumsum_FV[a] = cumsum_FV[a-1] + (apt_sum*(1+inflation_rate/12)-apt_sum);
    }
    console.log(cumsum_FV)

    var cumsum_profit_accum = cumsum_accum.map(function(item, index) {
          return item - cumsum_FV[index];})
    console.log(cumsum_profit_accum)

    return  cumsum_profit_accum
}

console.log(mortgage(100000, 8000000, 0.07, 10, 5000))
console.log(accumulation(140000, 8000000, 0.05, 10, 25000))
