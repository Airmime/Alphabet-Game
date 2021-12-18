$(document).ready(function () {
  /* Handle input. */
  $("body").on("keyup", "input", function (e) {
    if (e.key == "Enter") {
      newGame();
    } else if (e.key === "Backspace") {
      /* If you delete an entry. */
      let nextI = $("input").index(this) - 1;
      let next = $("input").eq(nextI);
      next.focus();
      next.val("");
    } else {
      /* If we write a letter. */
      let intputVal = $(this).val();
      let intputNum = $(this).attr("data-num");
      let valExcept = $(
        ".row-model__content[data-num=" + intputNum + "]"
      ).text();

      /* Speak letter. */
      useSpeaker(intputVal);

      if (intputVal.toUpperCase() == valExcept.toUpperCase()) {
        /* We check if letter is the same compared to model letter. */
        $(this).css("background-color", "#81c46d");
        let nextI = $("input").index(this) + 1;
        let next = $("input").eq(nextI);
        next.focus();
        changeActivLetter(nextI);
        checkWin();
      } else {
        /* If the letter is not the same */
        $(this).css("background-color", "red");
        sleep(500).then(() => {
          $(this).val("");
        });
      }
    }
  });

  /* Use speaker when click on dedicated icon. */
  $("body").on("click", ".row-model__speaker", function () {
    /* Get letter to speak. */
    let letter = $(this)
      .closest(".row-model__letter")
      .find(".row-model__content")
      .text();

    useSpeaker(letter);
  });
});

/**
 * Allow to start a new game.
 */
function newGame() {
  /* Loading words from .json file. */
  $.getJSON("words.json", function (data) {
    var items = [];
    $.each(data, function (key, val) {
      items.push(val);
    });

    /* Get random words. */
    let id = Math.floor(Math.random() * items.length);
    let word = items[id];
    let splitWord = word.split("");

    /* Clear old HTML. */
    $(".row-model").empty();
    $(".row-input").empty();

    /* Write HTML, with news letters model and news inputs. */
    let i = 1;
    splitWord.forEach((element) => {
      let activClass = i == 1 ? "row-model__active" : "";
      $(`
          <div class="row-model__letter ${activClass}">
            <span class="row-model__content" data-num="${i}">${element}</span>
            <span class="row-model__speaker"><i class="fas fa-volume-up"></i></span>
          </div>
        `).appendTo(".row-model");

      $(`
          <div class="row-input__letter"><input type="text" maxlength="1" data-num="${i}"/></div>
        `).appendTo(".row-input");

      i++;
    });

    /* Store word in HTML. */
    $(".row-menu__new").attr("data-word", word);

    /* Focus on first input. */
    $("input").filter(":visible:first").focus();
  });
}

/**
 * Function to check if the player win.
 */
function checkWin() {
  /* Get all letters model. */
  var letters = $(".row-model__content")
    .map(function () {
      return this.innerHTML;
    })
    .get();

  /* Get all input values. */
  var inputs = $("input")
    .map(function () {
      return this.value;
    })
    .get();

  /* Check if all inputs is good compared to the model. */
  let winner = false;
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].toUpperCase() == inputs[i].toUpperCase()) {
      winner = true;
    } else {
      winner = false;
      break;
    }
  }

  /* Display modal, and launch new game if we win. */
  if (winner) {
    addCookies();
    showModal(
      "https://cdn.dribbble.com/users/1375596/screenshots/3624968/media/8e0c7e0904dbbbe6a511168d66eb51b7.gif",
      "#75e4f8"
    );
    useSpeaker("Bravo, Tu as gagné, le mot était, " + getCurrentWord() + ".");
    newGame();
  }
}

/* Get current word to tap. */
function getCurrentWord() {
  return $(".row-menu__new").attr("data-word");
}

/**
 * Add cookies to the player.
 */
function addCookies() {
  let randdomTop = Math.floor(Math.random() * 70);
  let randdomLeft = Math.floor(Math.random() * 90);
  $(`
        <span class="row-menu__count__cookie" style="top: ${randdomTop}%; left: ${randdomLeft}%"><i class="fas fa-cookie"></i></span>
    `).appendTo(".row-menu__count");
}

function changeActivLetter(num) {
  $(".row-model>.row-model__letter").removeClass("row-model__active");

  $(".row-model__content[data-num=" + (parseFloat(num) + parseFloat(1)) + "]")
    .parent()
    .addClass("row-model__active");
}
