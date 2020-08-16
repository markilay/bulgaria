// BURGER
$(function () {
  $(".hamburger").click(function () {
    $(".small-menu").toggleClass("visible");
  });
});

// SCROLL
$(document).ready(function () {
  $("button.scrollto").click(function () {
    var elementClick = "#" + $(this).attr("data-target").split("#")[1];
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate(
      { scrollTop: destination },
      800
    );
    return false;
  });
});

// MODAL WINDOW
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

$(document).ready(function () {
  $("[data-submit]").on("click", function (e) {
    e.preventDefault();
    $(this).parent("form").submit();
  });
  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    },
    "Please check your input."
  );
  function valEl(el) {
    el.validate({
      rules: {
        tel: {
          required: true,
          regex: "^([+]+)*[0-9\x20\x28\x29-]{5,20}$",
        },
        name: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        tel: {
          required: "Поле обязательно для заполнения",
          regex: "Телефон может содержать символы + - ()",
        },
        name: {
          required: "Поле обязательно для заполнения",
        },
        email: {
          required: "Поле обязательно для заполнения",
          email: "Неверный формат E-mail",
        },
      },
      submitHandler: function (form) {
        $("#loader").fadeIn();
        var $form = $(form);
        var $formId = $(form).attr("id");
        switch ($formId) {
          case "goToNewPage":
            $.ajax({
              type: "POST",
              url: $form.attr("action"),
              data: $form.serialize(),
            }).always(function (response) {
              //ссылка на страницу "спасибо" - редирект
              location.href =
                "https://wayup.in/lm/landing-page-marathon/success";
              //отправка целей в Я.Метрику и Google Analytics
              ga("send", "event", "masterklass7", "register");
              yaCounter27714603.reachGoal("lm17lead");
            });
            break;
          case "popupResult":
            $.ajax({
              type: "POST",
              url: $form.attr("action"),
              data: $form.serialize(),
            }).always(function (response) {
              setTimeout(function () {
                $("#loader").fadeOut();
              }, 800);
              setTimeout(function () {
                $("#overlay").addClass("open");
                $("form").fadeOut();
                $form.trigger("reset");

                //строки для остлеживания целей в Я.Метрике и Google Analytics
              }, 1000);
              $("#overlay").on("click", function (e) {
                $(this).fadeOut();
                $("form").fadeIn();
              });
            });
            break;
        }
        return false;
      },
    });
  }

  $(".js-form").each(function () {
    valEl($(this));
  });
  $("[data-scroll]").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "data-scroll")).offset().top,
      },
      2000
    );
    event.preventDefault();
  });
});

//  slider
$(document).ready(function () {
  $(".slider").slick({
    dots: true,
    infinite: false,
    arrows: true,
    slidesToShow: 1,
    adaptiveHeight: false,
    // edgeFriction: 0.25,
    responsive: [
      {
        breakpoint: 768,
        centerMode: true,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          variableWidth: !0,
          arrows: false,
          centerMode: true,

          slidesToShow: 1,
        },
      },
    ],
    prevArrow:
      '<i class="fa slider__arrow fa-angle-left" aria-hidden="true"></i>',
    nextArrow:
      '<i class="fa slider__arrow fa-angle-right" aria-hidden="true"></i>',
  });
});
