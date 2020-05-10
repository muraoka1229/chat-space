$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat__messages__message">
         <div class="chat__messages__message__upper-info">
           <div class="chat__messages__message__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="chat__messages__message__upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat__messages__message__text">
           <p class="chat__messages__message__text__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat__messages__message">
         <div class="chat__messages__message__upper-info">
           <div class="chat__messages__message__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="chat__messages__message__upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat__messages__message__text">
           <p class="chat__messages__message__text__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat__messages').append(html).animate({ scrollTop: $('.chat__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.chat__form__new-message__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
});