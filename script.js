

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var date = dayjs().format('dddd, MMMM D, YYYY') //day.js current date formated to day, month, day, year
  var currentHour = dayjs().hour() // day.js current hour

  var pastHours = []  // array with past hours
  var futureHours = [] // array with future hours

  $("#currentDay").text(date); // display current date in header

  // for loop to push future hours into futureHours array
  for (var i = currentHour + 1; i < 24; i++) {
    futureHours.push(i)
  }

  // for loop to push past hours into pastHours array
  for (var i = currentHour - 1; i >= 0; i--) {
    pastHours.push(i)
  }

  // function to change 24 hour time to 12 hour time and add AM or PM
  function changeTo12(array) {
    var newArray = []
    array.forEach(function (value) {
      if (value > 12) {
        value = value - 12 + "PM"
      } else if (value === 0) {
        value = 12 + "AM"
      } else if (value === 12) {
        value = value + "PM"
      }
      else { value = value + "AM" }
      newArray.push(value)
    })
    return newArray
  }

  var pastIn12Hours = changeTo12(pastHours) // past hours in 12 hour time
  var futureIn12Hours = changeTo12(futureHours) // future hours in 12 hour time

  // function to change current hour to 12 hour time and add AM or PM
  var currentTo12 = function current12() {
    if (currentHour > 12) {
      currentHour = currentHour - 12 + "PM"
    } else if (currentHour === 0) {
      currentHour = 12 + "AM"
    } else if (currentHour === 12) {
      currentHour = currentHour + "PM"
    } else { currentHour = currentHour + "AM" }
    return currentHour
  }
  currentTo12()

  //add current hour to page
  $('.main-container').html(` <div id="hour-${currentHour}" class="row time-block present">
  <div class="col-2 col-md-1 hour text-center py-3">${currentHour}</div>
  <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div>`)


  $.each(pastIn12Hours, function (index, value) {
    $('.main-container').prepend(` <div id="hour-${value}" class="row time-block past">
  <div class="col-2 col-md-1 hour text-center py-3">${value}</div>
  <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div>`)
  })

  // add future hours to page
  $.each(futureIn12Hours, function (index, value) {
    $('.main-container').append(` <div id="hour-${value}" class="row time-block future">
  <div class="col-2 col-md-1 hour text-center py-3">${value}</div>
  <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>
</div>`)

  })

  $(".saveBtn").on("click", function () {
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    localStorage.setItem(time, text);
    console.log(time, text)

    $('.header').append(`<span class="alert alert-success alert-dismissible fade show" role="alert">Appointment Added to Schedule!</span>`)
    setTimeout(function () {
      $('.alert').remove()
    }, 2000)
  })
  $(".description").each(function () {
    var id = $(this).parent().attr("id");
    var text = localStorage.getItem(id);
    $(this).val(text);
  })

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
