/**
 * Allow to display modale.
 * @param {*} img Image to display.
 * @param {*} backgroundColor Background color behind the image.
 */
function showModal(img, backgroundColor) {
  /* Prepar image and change backgound color. */
  $(".illustration-modal img").attr("src", img);
  $(".illustration-modal").css("background-color", backgroundColor);

  /* Show modal */
  $(".illustration").show();

  /* After display hide modale and set default background. */
  sleep(5000).then(() => {
    $(".illustration").hide();
    $(".illustration-modal").css("background-color", "#fff");
  });
}

/* Close modale. */
$("body").on("click", ".illustration-modal img", function (e) {
  $(".illustration").hide();
});
