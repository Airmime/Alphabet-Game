$(document).ready(function () {
  /* Start new game. */
  $("body").on("click", ".home-start p", function (e) {
    $(".container-home").hide();
    $(".container-game").show();
    $("input").filter(":visible:first").focus();
  });

  /* Start new game manualy. */
  $("body").on("click", ".row-menu__new", function (e) {
    newGame();
  });

  /* Clear current inputs. */
  $("body").on("click", ".row-menu__clear", function (e) {
    $("input").val("");
    $("input").css("background-color", "white");
    $("input").filter(":visible:first").focus();
  });

  newGame();
});

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
