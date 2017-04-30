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
      $("#group-list").append($('<a class="group-link" data-target="' + el.name + '">' + el.name + "</a> <br>"));
    })
  })

  $(document).on('click', ".group-link", function(event) {
    $.ajax({
      url: '/api/getPosts',
      type: 'POST',
      dataType: 'json',
      data: {
        token: getCookieValue('token'),
        groupName: $(this).data('target')
      }
    })
    .done(function(data) {
      data.posts.forEach(function(el){
        $("#post-list").append('<div class="post"><div class="post-title">' + el.title + '</div>' + '<div class="post-content">' + el.content + '</div></div>');
      })
    })
  });
});

console.log('here');
