var getCookieValue = function(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}


$(document).ready(function() {
  $.ajax({
    url: '/api/getGroups',
    type: 'POST',
    dataType: 'json',
    data: {
      token: getCookieValue('token')
    }
  })
  .done(function(data) {
    data.groups.forEach(function(el){
      $("#group-list").append('<a class="group-link" data-target="' + el.name + '">' + el.name + "</a> <br>")
    })
  })


  $("#submit").on('click', function(event) {
    event.preventDefault(event);
    const password = $("#password").val();
    const username = $("#username").val();
    $.ajax({
      url: '/api/groups',
      type: 'POST',
      dataType: 'json',
      data: {
        email: username,
        password: password
      }
    })
    .done(function(data) {
      if(data.token === undefined){
        return alert("unable to log in");
      }

      document.cookie = "token=" + data.token;
      window.location.href = "/uniofessex";
    });
  });
});

console.log('here');
