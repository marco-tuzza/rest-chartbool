var venditeMensili = {};

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

        }

        var vendite = Object.values(venditeMensili)

        var ctx = document.getElementById('barChart').getContext('2d');

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
                datasets: [{
                    label: 'Andamento vendite',
                    data: vendite,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
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


    }

})
