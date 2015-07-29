;(function() {

  var createHeader = function(text) {
    var h1 = document.createElement('h1');
    h1.className = "header";
    h1.setAttribute("data-js", "header");
    h1.innerText = text;
    document.body.insertBefore(h1, document.body.childNodes[0]);
    return;
  };

  var getJSON = function(url, callback) {
    var request = new XMLHttpRequest;
    request.open('GET', url);
    request.onload = callback;
    request.send();
    return;
  };

  var buildPaletteDiv = function(palette) {
    var div = document.createElement('div');
    div.className = "palette__single";

    var textDiv = document.createElement('div');
    textDiv.className = "palette__text";

    var titleDiv = document.createElement('div');
    titleDiv.className = "palette__topText";
    titleDiv.innerHTML = "<strong>Title: </strong>" + palette.title;

    var keywordDiv = document.createElement('div');
    keywordDiv.className = "palette__topText";
    keywordDiv.innerHTML = "<strong>Keyword: </strong>" + palette.keyword;

    textDiv.appendChild(titleDiv);
    textDiv.appendChild(keywordDiv);

    var colorsDiv = document.createElement('div');
    colorsDiv.className = "palette__colors";

    var colors = [
      palette.colors.dominant,
      palette.colors.contrastingDominant,
      palette.colors.subDominant,
      palette.colors.contrastingSubDominant,
      palette.colors.pop,
    ]

    var msgs = [
      "Dominant<br>",
      "Contrasting<br>Dominant<br>",
      "Sub-Dominant<br>",
      "Contrasting<br>Sub-Dominant<br>",
      "Pop<br>"
    ]

    var el, elHover;
    for (i = 0; i < 5; i++) {
      el = document.createElement('div');
      el.className = "palette__color";
      el.style.backgroundColor = colors[i];
      elHover = document.createElement('div');
      elHover.className = "palette__colorHover";
      elHover.innerHTML = msgs[i] + colors[i];
      el.appendChild(elHover);
      colorsDiv.appendChild(el);
    };

    div.appendChild(textDiv);
    div.appendChild(colorsDiv);

    return div
  };

  var addPalettes = function(e) {
    var palettes = JSON.parse(e.target.responseText);
    var paletteDiv = generatePalettes(palettes);
    var header = document.querySelector('[data-js="header"]');
    document.body.insertBefore(paletteDiv, header.nextSibling)
  };

  var generatePalettes = function(palettes) {
    var mainDiv = document.createElement('div');
    mainDiv.className = "palettes__all";
    palettes.forEach(function(palette) {
      var paletteDiv = buildPaletteDiv(palette);
      mainDiv.appendChild(paletteDiv);
    });
    return mainDiv;
  };

  createHeader("Hex Mex");
  getJSON('/palettes.json', addPalettes);

})();
