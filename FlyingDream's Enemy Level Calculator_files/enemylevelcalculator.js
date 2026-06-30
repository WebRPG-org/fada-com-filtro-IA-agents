//Thank you for using my calculator for RPG Maker MV! You can contact me through Yanfly's video https://www.youtube.com/watch?v=dr2ghn56oA4
function update() {
	for (var i = 0; i < 10; ++i) {
    var b = parseInt(document.getElementById('base' + i).value);
    var r = parseFloat(document.getElementById('rate' + i).value);
    var f = parseFloat(document.getElementById('flat' + i).value);
    var formula = String(document.getElementById('formula' + i).value)
    calculateLevelValue(i, b, r, f, formula);
  }
}

function calculateLevelValue(type, b, r, f, formula) {
  for (var lv = 0; lv < 16; ++lv) {
    var level = parseInt(document.getElementById('level' + lv).value);
    var value = calculateFormula(b, r, f, level, formula);
    var ele = getType(type) + lv;
    refresh(ele, value);
  }
};

function getType(type) {
    if (type === 0) {
      return 'maxhp';
    } else if (type === 1) {
      return 'maxmp';
    } else if (type === 2) {
      return 'atk';
    } else if (type === 3) {
      return 'def';
    } else if (type === 4) {
      return 'mat';
    } else if (type === 5) {
      return 'mdf';
    } else if (type === 6) {
      return 'agi';
    } else if (type === 7) {
      return 'luk';
    } else if (type === 8) {
      return 'exp';
    } else if (type === 9) {
      return 'gold';
    }
};

function calculateFormula(b, r, f, level, formula) {
  var value = Math.floor(eval(formula));
  value = commas(value);
  return value;
}

function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function refresh(id, value) {
  document.getElementById(id).innerHTML = value;
}

$(document).ready(function(){
    $('.box, .formulaBox').on('change keyup paste', function(){
      $(this).click();
    });
});

window.onload=update;