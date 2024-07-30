// Project Information below
console.log("Week 12 - Project 12");

//The API for the movies endpoint
const apiUrl = "http://localhost:3000/movies";

    //Convert the document ready to a function
    function startApp() {
        console.log("Displaying Movies..."); 
       
        //Fetch and display movies
        function fetchMovies() {
            $.ajax({
                url: apiUrl,
                method: "GET",
                success: function (data) {
                    //Clearing the current movie list 
                  $("#movie-list").empty();
                  //Iterating through the fetch movies and append them to the list
                  data.forEach((movie) => {
                    $("#movie-list").append(`
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
                },
                error: function (error) {
                    console.error("Error fetching movies:". error); 
                    alert("Failure to load movies, Try again later.");
                        }
                 });
            }

    // Add Eventlistener for adding a new movie 
    $('#submitBtn').on("click", function(e) {
        console.log("Submit button clicked"); 
        e.preventDefault();
        
        // Gather new movie data from inputs
        const newMovie = {
            title: $("#movie-title").val(),
            genre: $("#movie-genre").val(),
            image: $("#movie-image").val(),
        };
        console.log("New Movie Data:", newMovie);
        
        // Send new movie data to the server 
        $.ajax({
            url: apiUrl,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(newMovie),
            success: function() {
                // Clear from input after successful submission.
                $("#movie-title").val("");
                $("#movie-genre").val("Action");
                $("#movie-image").val("");
                // Refresh the movie list 
                fetchMovies();
             },
             error: function (error) {
                console.error("Error adding movie:", error);
                alert("Failed to add movie. Try again later please.");
             }
         });
    });

    // Adding an Eventlistener for editing and existing movie. 
    $(document).on('click', '.edit-btn', function() {
        //Getting the movie ID from the data attribute. 
        const id = $(this).data('id');
        //To prompt the user for a new details for a movie. 
        const newTitle = prompt('Enter new movie title:');
        const newGenre = prompt('Enter new genre (Action, Drama, Comedy, Rom-Com):');
        const newImage = prompt('Enter new image URL:');
        
        // Check if new details are provided. 
        if (newTitle && newGenre && newImage) {
            //Sending updated movie data to the server. 
            $.ajax({
                url: `${apiUrl}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify({ 
                    title: newTitle, 
                    genre: newGenre, 
                    image: newImage, 
                }),
                success: function() {
                    //Refreshing the movie list after successful update. 
                    fetchMovies();
                },
                error: function (error) {
                    console.error("Error update movie:", error); 
                    alert("Failed tp update movie. Please try again later."); 
                },
            });
        }
    });

      // Setting an Eventlistener for deleting a movie, and get the movie ID from the data attribute. 
  $(document).on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    //Sending a delete request to the server. 
    $.ajax({
      url: `${apiUrl}/${id}`,
      method: "DELETE",
      success: function () {
        //Refresh the movie list after successful deletion. 
        fetchMovies();
      },
      //adding in a error request
      error: function (error) {
        console.error("Error deleting movies", error); 
        alert("Failed to delete movies. Please try again later."); 
      }
    });
  });

  // Initial fetch to display the movies list when the app starts. 
  fetchMovies();
}

// Start the overall app. 
startApp(); 