jQuery(function() {

    $("button").on("click", function(){

        let endpoint = 'https://api-challenge.blockinar.io/bookings';
    
        axios.get(endpoint)
        .then(function (response) {
            // manejar respuesta exitosa
            console.log(response.data);
            //console.log(response.data[0].first_name);
        })
        .catch(function (error) {
            // manejar error
            console.log(error);
        });
    });
});