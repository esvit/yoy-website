function getIp() {
  return new Promise(function (resolve) {
    $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
      // Convert key-value pairs to JSON
      // https://stackoverflow.com/a/39284735/452587
      data = data.trim().split('\n').reduce(function(obj, pair) {
        pair = pair.split('=');
        return obj[pair[0]] = pair[1], obj;
      }, {});
      resolve(data.ip);
    });
  });
}


var $form = $('#form'),
  url = 'https://script.google.com/macros/s/AKfycbzjfu89YfQUMj_Es_dx13qluhx68v_rl8US1WWl2W-flGTFgP4wyqN4L5lRW-Cy_yie/exec'
$.fn.serializeObject = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

$('#submit').on('click', function(e) {
  e.preventDefault();
  $('#submit').attr('disabled', 'disabled').text('Зберігаємо...');
  getIp().then(function(ip) {
    var data = $form.serializeObject();
    data.ip = ip;
    if (!data.name) {
      alert('Введіть, будь ласка, ім\'я');
      return;
    }
    if (!data.birthdate) {
      alert('Виберіть, будь ласка, дату народження');
      return;
    }
    if (!data.phone) {
      alert('Введіть, будь ласка, телефон');
      return;
    }
    var jqxhr = $.ajax({
      url: url,
      crossDomain: true,
      method: "GET",
      dataType: "json",
      data: data
    }).then(function() {
      alert('Ваші дані збережено');
      $('input').val('');
      $('#submit').removeAttr('disabled', 'disabled').text('Зареєструватись');
    }).catch(function() {
      alert('Трапилась помилка, спробуйте трохи пізніше');
    });
  });
});
