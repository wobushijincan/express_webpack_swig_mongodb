require('./list.styl');

$(function(){
    $('#getMovies').click(function(){
         $.ajax({
             type: "GET",
            dataType: "json",
            url: "http://localhost:8080/api/getName",
            data: {},
            success: function(data){
                console.log(data)
            },
            error: function(data) {
                console.log('>>>', err)
            }
         });
    });
});
