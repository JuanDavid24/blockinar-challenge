jQuery( () => { 
    $("#pill-list-bookings-tab").on("click", () => {
        let table_is_initialized = $.fn.DataTable.isDataTable( '#booking-table' )
          
        if (!table_is_initialized) {
            let booking_table = $('#booking-table').DataTable({
                processing: true,
                ajax: {
                    "url": "https://api-challenge.blockinar.io/bookings",
                    dataSrc:"",
                },
                columns: [
                    { data: 'id'},
                    { data: 'first_name'},
                    { data: 'last_name' },
                    { data: 'check_in_date',
                      render: $.fn.dataTable.render.datetime()},
                    { data: 'check_out_date',
                      render: $.fn.dataTable.render.datetime()},
                    { data: 'booking_status' },
                    { data: 'number_of_guests' },
                    { data: 'price_per_night' },
                    { data: 'room_id' },
                ],
            });
        }
        // --- Actualizo tabla ---
        else $('#booking-table').DataTable().ajax.reload()
    });

    $("#search-booking-form").on("submit", () => { 
        let input = $("#search-booking-form input");
        if ( input.val() ) {
            get_from_API( 'https://api-challenge.blockinar.io/bookings/' + input.val() )
            .then(result => {
                $("#id-to-edit").val(result.id);
                $("#check-in-to-edit").val(result.check_in_date);
                $("#check-out-to-edit").val(result.check_out_date);
                $("#guests-to-edit").val(result.number_of_guests);
                $("#room-id-to-edit").val(result.room_id);
                $("#price-to-edit").val(result.price_per_night);
                $("#first-name-to-edit").val(result.first_name);
                $("#last-name-to-edit").val(result.last_name);
                $("#status-to-edit").val(result.booking_status);
                console.log(result)
            })
            .catch(
                err => alert(`No se pudo completar la solicitud. Error: ${err}`)
            );}
      });

    $("#refresh-btn").on("click", async () => {
        let table_is_initialized = $.fn.DataTable.isDataTable( '#booking-table' )
        if (table_is_initialized) {
        $('#booking-table').DataTable().ajax.reload(); }
    });

    // $("#sort-by-name-btn").on("click", () => {
    //     $("#tbody").empty() //limpiar tabla
    //     bookings = JSON.parse(sessionStorage.bookings);
    //     sort_bookings_by_name(bookings);
    // });
});

// Realiza un GET a un endpoint y devuelve la data del response
const get_from_API = async ( URL, params='' ) => {
    const response = await axios.get( URL + params );
    return response.data
}
const post_to_API = async ( URL, params='' ) => {
    const response = await axios.post( URL + params );
    return response.data
}

// --- Obtiene todas las reservas en formato JSON y las muestra en una tabla ---
async function get_all_bookings() {
    await get_from_API('https://api-challenge.blockinar.io/bookings')
        .then(bookings => {
            sessionStorage.setItem('bookings', JSON.stringify(bookings));
            // bookings.forEach(booking => booking_to_table_row(booking));
            data_set = make_dataset(bookings)
            console.log(data_set)
            console.log(bookings[0])

        })
        .catch(
            err => alert(`No se pudo completar la solicitud. Error: ${err}`)
        );
}

// const make_dataset = object_array => {
//     let data_set = []
//     object_array.forEach(obj => {
//         data_set.push( Object.values(obj) )
//     });
//     return data_set
// };
// const booking_to_table_row = booking => {
//     $('#tbody').append(`<tr>
//         <th scope="row">${booking.id}</th>
//         <td>${booking.first_name}</td>
//         <td>${booking.last_name}</td>
//         <td>${booking.check_in_date}</td>
//         <td>${booking.check_out_date}</td>
//         <td>${booking.booking_status}</td>
//         <td>${booking.number_of_guests}</td>
//         <td>${booking.price_per_night}</td>
//         <td>${
//             (booking.room_id===null ? '' : booking.room_id)
//         }</td>
//         </tr>`);
//     };

// const sort_bookings_by_name = bookings => {
//     bookings.sort( function(a, b){
//         let x = a.last_name.toLowerCase();
//         let y = b.last_name.toLowerCase();
//         if (x < y) {return -1;}
//         if (x > y) {return 1;}
//         return 0;
//       });
//       bookings.forEach(booking => booking_to_table_row(booking));
// };
// --- get booking por fecha de check in ---
// 'https://api-challenge.blockinar.io/bookings?check_in=2021-10-2415:00:00'