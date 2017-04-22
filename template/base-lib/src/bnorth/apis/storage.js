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

Storage.saveSessionItem = function(item,data){
    window.sessionStorage.setItem(item,data);
}
Storage.getSessionItem = function(item){
    return window.sessionStorage.getItem(item);
}
Storage.removeSessionItem = function(item){
    window.sessionStorage.removeItem(item);
}

export default Storage;
