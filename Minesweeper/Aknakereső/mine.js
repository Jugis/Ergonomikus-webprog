var firstclick = false;
var numOfMines = 3;
var idValtozo = 0;

function createTable(selector) {
	var i, j;
	var $table = $('<table>');

	for (i = 0; i < 10; i++) {
		var $tr = $('<tr>');
		for (j = 0; j < 10; j++) {
			idValtozo++;
			$tr.append(
					$('<td>').click(
							function (event) {
								if (firstclick == false) {
									addMines($(this));
									numberGenerator();
									firstclick = true;
								}else{
									userClicking($(this));
								}
								if (event.which == 3){
									event.preventDefault();
									alert('aaddwawda');
								}
							}
					).attr("id", idValtozo).attr("x", i).attr("y", j).attr("szam",0)
							.bind("contextmenu", function(e){
								e.preventDefault();
								zaszloRelakas($(this));
								nyeresEllenorzes();
			})
			);
		}
		$table.append($tr);
	}
	$(selector).append($table);
}
function zaszloRelakas ($td) {
	$td.toggleClass('zaszlo');
}

function nyeresEllenorzes(){
	var numOfMines = 0;
	var numOfFlags = 0;
	$(".c4").each(function(){
		numOfMines++;
		if($(this).hasClass('zaszlo')){
			numOfFlags++;
		}
	});
	if(numOfFlags == numOfMines){
		nyeres();
	};
}

function nyeres(){
	alert('win');
}

function addMines($td) {
	var id = $td.attr('id');
	for(var i=0; i < numOfMines; i++){
		var mineID = Math.floor(Math.random() * 100);
		if (id != mineID) {
			$('#'+mineID).attr('class', 'c4');
		};
	}
}

function numberGenerator() {
	$(".c4").each(function(){
		var tempX = parseInt($(this).attr("x"));
		var tempY = parseInt($(this).attr("y"));
		for(i=tempX-1; i<=tempX+1; i++){
			for (j=tempY-1; j<=tempY+1; j++){
				var szamertek = $('td[x="' + i + '"][y="' + j + '"]').attr("szam");
				var $td = $('td[x="' + i + '"][y="' + j + '"]').attr("szam", parseInt(szamertek)+parseInt(1));
			}
		}
	});
}

$(document).ready(function() {
	createTable("#tableholder");
})

function userClicking($td){
	if (!$td.hasClass('c4')){
		rekurzivKitolto($td);
	}
	if (parseInt($td.attr('szam')) > 0){
		$td.addClass('proba');
	}
	if ($td.hasClass('c4')){
		vesztes();
	}

}

function rekurzivKitolto($td){
	var felfedettSzomszedok = parseInt(0);
	var x = parseInt($td.attr('x'));
	var y = parseInt($td.attr('y'));

	if (parseInt(felfedettSzomszedok) <= 9 && (parseInt($td.attr('szam')) == parseInt(0))){
		for (var i = x - 1; i <= x + 1; i++) {
			for (var j = y - 1; j <= y + 1; j++) {
				console.log(felfedettSzomszedok);
				felfedettSzomszedok++;
				var $this = $('td[x=\"' + i + '\"][y=\"' + j + '\"]');
				if (!$this.hasClass('proba')){
					$this.addClass('proba');
					rekurzivKitolto($this);
				}
			}
		}
	}else{

	}
}
function vesztes(){
	alert('Szar vagy');
}

function felfed($td){
	$td.addClass('proba');
}