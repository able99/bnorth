let Storage = {};

Storage.saveItem = function(item,data){
	window.localStorage.setItem(item,data);
}
Storage.getItem = function(item){
	return window.localStorage.getItem(item);
}
Storage.removeItem = function(item){
	window.localStorage.removeItem(item);
}

export default Storage;
