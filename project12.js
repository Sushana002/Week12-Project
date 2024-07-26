$(document).on('ready', function() {
    const apiUrl = 'http://localhost:3000/movies';

    // Fetch and display movies
    function fetchMovies() {
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(data) {
                $('#movie-list').empty();
                data.forEach(movie => {
                    $('#movie-list').append(`
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <img src="${movie.image}" alt="${movie.title}" class="img-thumbnail" style="width: 100px; height: 150px;">
                                <div class="ml-3">
                                    <h5>${movie.title} (${movie.genre})</h5>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-success btn-sm mr-2 edit-btn" data-id="${movie.id}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${movie.id}">Delete</button>
                            </div>
                        </li>
                    `);
                });
            }
        });
    }

    // Add new movie
    $('#movie-form').on('submit', function(e) {
        e.preventDefault();
        const newMovie = {
            title: $('#movie-title').val(),
            genre: $('#movie-genre').val(),
            image: $('#movie-image').val()
        };

        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newMovie),
            success: function() {
                $('#movie-title').val('');
                $('#movie-genre').val('Action');
                $('#movie-image').val('');
                fetchMovies();
            }
        });
    });

    // Edit movie
    $(document).on('click', '.edit-btn', function() {
        const id = $(this).data('id');
        const newTitle = prompt('Enter new movie title:');
        const newGenre = prompt('Enter new genre (Action, Drama, Comedy, Rom-Com):');
        const newImage = prompt('Enter new image URL:');

        if (newTitle && newGenre && newImage) {
            $.ajax({
                url: `${apiUrl}/${id}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ title: newTitle, genre: newGenre, image: newImage }),
                success: function() {
                    fetchMovies();
                }
            });
        }
    });

    // Delete movie
    $(document).on('click', '.delete-btn', function() {
        const id = $(this).data('id');

        $.ajax({
            url: `${apiUrl}/${id}`,
            method: 'DELETE',
            success: function() {
                fetchMovies();
            }
        });
    });

    // Initial fetch
    fetchMovies();
});
