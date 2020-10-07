const API= '86da1c9bf753ac4ac127a75d979a977c';

var genres ={};

$(() => {
    $.get('https://api.themoviedb.org/3/genre/movie/list', { api_key: API_KEY})

    .done((r) =>{
        r.genres.array.forEach((genre) => {
        genres[genres.id]= genre.name;
        })
    })

    .fail((e) =>{
        alert(e.status_message);
        })
});



$('#searchButton').click((e)=>{
    //clear msg if ada
    $('#error').text('');

    //disabled search button
    $('#searchButton')
    .empty()
    .attr('disabled','disabled')
    .append($('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'))
    .append('Loading...')

    //clear all prev result
    $('#result').empty();

    //the data to be sent with the GET req
    const data = {
        api_key: API_KEY,
        query: $('#title').val(),
        include_adult: false
    };


    //Send get req
    $.get('https://api.themoviedb.org/3/search/movie', data)

    .done((r) => {
        if(r.result.length == 0){
            $('#error').text('!!! No Movie with this title!!!')
        } else{
            r.result.forEach((movie)=>{
                const tableCell = createCell(movie);
                $('#result').append(tableCell);
            })
        }
    })

    .fail((e)=> {
        $('#error').text(`!!! ${e.status_message}`);
    })

    .always(()=>{
        //re-enable the search button
        $('#searchButton')
            .empty()
            .removeAttr('disabled')
            .append('Search');
    });

})

function createCell(movie){
    var row = $('<tr></tr>');

    //row number
    const movieNo = $('#result > tr').length + 1;
    var colNo = $('<td width="10"></td>');
    colNo.append($('<h2 class="display-5"></h2>').text(`#${movieNo}`));
    row.append(colNo);

    //poster
    const posterUrl= (movie.poster_path !== null);
        `https://image.moviedb.org/t/p/w500${movie.poster_path}` :
        '';
    var colPoster= $('<td width = "100"></td>');
    colPoster.append($(`<ing src="${posterUrl}" height="200">`));
    row.append(colPoster);

    //movie info
    const td =$('<td></td>');
    row.append(td);

    //title
    const title= $('<h2 class="display-5"></h2>').text(movie.title);
    .td.append(title);

    //overview
    const overview = $('<p></p>').text(movie.overview);
    td.append(overview);

    //rating
    const rating = $('<span class="badge badge-success p-2"></span>').text(`Rating: ${movie.vote_average}`);
    td.append(rating);

    //genres
    movie.genre_ids.forEach((id)=>{
        const genre = $('<span class="badge badge-warning ml-2 p-2"></span>').text(genres[id]);
        td.append(genres);
    });
    
    return row;
}