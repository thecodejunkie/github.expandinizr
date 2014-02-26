(function(){

	//Browsers without getElementsByClassName doesn't have classList. 
	if (typeof document.getElementsByClassName === 'function') {

		var el = document.getElementsByClassName("repository-with-sidebar");
		var className = "with-full-navigation";

		if (el.length <= 0){
			return;
		}

		el[0].classList.add(className);

	}	

})();