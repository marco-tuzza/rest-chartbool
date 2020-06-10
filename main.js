var venditeMensili = {};

var venditePersonali = {};

$.ajax({

    "url": "http://157.230.17.132:4032/sales",

    "success": function(sales) {

        for (var i = 0; i < sales.length; i++) {

            var check = moment(sales[i].date, 'DD/MM/YYYY');

            var mese = check.format('M');

            if (!venditeMensili.hasOwnProperty(mese)) {

                venditeMensili[mese] = sales[i].amount;

            } else {

                venditeMensili[mese] += sales[i].amount;

            }

            var venditore = sales[i].salesman


            if (!venditePersonali.hasOwnProperty(venditore)) {

                venditePersonali[venditore] = sales[i].amount;

            } else {

                venditePersonali[venditore] += sales[i].amount;

            }

        };

        var venditori = Object.keys(venditePersonali)

        var venditeSingole = Object.values(venditePersonali)

        var vendite = Object.values(venditeMensili)

        var ctxB = document.getElementById('barChart').getContext('2d');

        var ctxP = document.getElementById('pieChart').getContext('2d');

        var myChart = new Chart(ctxB, {
            type: 'line',
            data: {
                labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
                datasets: [{
                    label: 'Andamento vendite',
                    data: vendite,
                    backgroundColor: [
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

        var myChart = new Chart(ctxP, {
            type: 'pie',
            data: {
                labels: venditori,
                datasets: [{
                    label: 'Andamento vendite',
                    data: venditeSingole,
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
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });


    }

})
