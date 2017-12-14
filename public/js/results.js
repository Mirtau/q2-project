$(document).ready(() => {
  const results = JSON.parse(localStorage.getItem('results'))
  const search_id = localStorage.getItem('search_id')
  const stat1 = localStorage.getItem('stat1')
  const stat2 = localStorage.getItem('stat2')
  $('#confidence').html('Confidence = ' + (results[0].confidence * 100).toFixed(2) + '%')
  let tr = $('<tr/>')
  tr.append("<td>" + "<h5>Rank</h5>" + "</td>")
  tr.append("<td>" + "<h5>Player</h5>" + "</td>")
  tr.append("<td>" + "<h5>Correlation</h5>" + "</td>")
  tr.append("<td>" + `<h5>${stat1}</h5>` + "</td>")
  tr.append("<td>" + `<h5>${stat2}</h5>` + "</td>")
  $('table').append(tr)
  for (var i = 0; i < results.length; i++) {
      let tr = $('<tr/>')
      tr.append("<td>" + '#' + (i+1) + "</td>")
      tr.append("<td>" + results[i].player + "</td>")
      tr.append("<td>" + results[i].correl.toFixed(2) + "</td>")
      tr.append("<td>" + results[i].stat1 + "</td>")
      tr.append("<td>" + results[i].stat2 + "</td>")
      $('table').append(tr)
    }
  const ball = $('#ball')
  if (ball.css('color') === 'rgba(0, 0, 0, 0)') {
  }
  else {

  }
  ball.click(function() {
    $.getJSON('/token')
      .done((loggedIn) => {
        if (loggedIn) {
          if ($(this).css('color') === 'rgba(0, 0, 0, 0)') {
            addFavorite()
          } else {
            removeFavorite()
          }
        } else {
          Materialize.toast('You must be logged in to add favorites', 2500)
        }
      })
  })
  const addFavorite = () => {
    event.preventDefault();


      const options = {
        contentType: 'application/json',
        data: search_id,
        dataType: 'json',
        type: 'POST',
        url: '/favorites'
      };

      $.ajax(options)
        .done(() => {
          ball
            .css({'color': 'orange', 'animation': 'fade1 .5s linear 1'})
            .attr({'data-tooltip': 'Remove Favorite'})
            .tooltip();
          Materialize.toast('Favorite added', 1500)
        })
        .fail(() => {
          Materialize.toast('Unable to add favorite', 2000);
        });
  }
  const removeFavorite = () => {
    event.preventDefault();

      const options = {
        contentType: 'application/json',
        data: search_id,
        dataType: 'json',
        type: 'DELETE',
        url: '/favorites'
      };

      $.ajax(options)
        .done(() => {
          ball
            .css({'color': 'rgba(0, 0, 0, 0)', 'animation': 'fade2 .5s linear 1'})
            .attr({'data-tooltip': 'Add Favorite'})
            .tooltip()
          Materialize.toast('Favorite removed', 1500)
        })
        .fail(() => {
          Materialize.toast(
            'Unable to remove favorite',
            3000
          );
        });

  }
  $('ul.tabs').tabs({
    swipeable: true,
    responsiveThreshold: 1920
  })
})
