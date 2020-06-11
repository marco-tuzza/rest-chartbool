var url = "http://157.230.17.132:4032/sales"

var venditeMensili = {};

var venditePersonali = {};

var totaleVendite = 0

$.ajax({

    "url": url,

    'method': 'GET',

    "success": function(sales) {

        for (var i = 0; i < sales.length; i++) {

            var check = moment(sales[i].date, 'DD/MM/YYYY');

            var mese = check.format('M');

            calcoloAnnuo(venditeMensili, mese, sales[i].amount)

            calcoloVenditori(venditePersonali, sales[i].salesman, sales[i].amount)

            totaleVendite += sales[i].amount

        };

        var vendite = Object.values(venditeMensili)

        var venditori = Object.keys(venditePersonali)

        calcoloPercentuale(venditePersonali)

        var venditeSingole = Object.values(venditePersonali)

        barChart(vendite)

        pieChart(venditori, venditeSingole)

    }

})

// funzione per il calcolo delle vendite annuali (grafico 1)
function calcoloAnnuo(a,b,c) {

    if (!a.hasOwnProperty(b)) {

        a[b] = c;

    } else {

        a[b] += c;

    }

}

// funzione per disegnare il grafico a linea, (grafico1)
function barChart(a) {

    var ctxB = document.getElementById('barChart').getContext('2d');

    var myChart = new Chart(ctxB, {
        type: 'line',
        data: {
            labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
            datasets: [{
                label: 'Andamento vendite',
                data: a,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

// funzione per il calcolo delle vendite dei singoli venditori (grafico 2)
function calcoloVenditori(a,b,c) {

    if (!a.hasOwnProperty(b)) {

        a[b] = c;

    } else {

        a[b] += c;

    }

}

// funzione per disegnare il grafico a torta (grafico2)
function pieChart(a,b) {

    var ctxP = document.getElementById('pieChart').getContext('2d');

    var myChart = new Chart(ctxP, {
        type: 'pie',
        data: {
            labels: a,
            datasets: [{
                label: 'Andamento vendite',
                data: b,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    display: false,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });


}

// funzione per il calcolo della percentuale

function calcoloPercentuale(a) {

    for (var key in a) {

        var percentualeVenditore = (a[key] * 100 / totaleVendite).toFixed(1);

        a[key] = percentualeVenditore;
    }

}

// funzione per selezionare la data
$(".month").change(

    function() {

        var month = $(".month").val()

        if (month == 4 || month == 6 || month == 9 || month == 11) {

            $(".data-a").hide()

        } else if (month == 2) {

            $(".data-b").hide()

        } else {

            $(".data-b").show()

        }
    }
);

$(".request").click(sendRequest)

function sendRequest() {

    var salesman = $(".salesman").val()

    var amount = parseInt($(".amount").val())

    console.log(amount);

    var date = $(".day").val() + "/" + $(".month").val() + "/" + "2017"

    $.ajax ({

        "url": url,

        "method": "POST",

        "data" : {

            "salesman" : salesman,

            "amount" : amount,

            "date" : date
        },

        "success": function() {

        alert("Chiamata riuscita!")

        },

        "error": function() {

        alert("Chiamata fallita, si prega di riprovare...");

        }
    });


}
