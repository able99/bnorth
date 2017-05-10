let Storage = {};

Storage.saveItem = function(item,data){
	window.localStorage.setItem(item,JSON.stringify(data));
}
Storage.getItem = function(item){
	return JSON.parse(window.localStorage.getItem(item));
}
Storage.removeItem = function(item){
	window.localStorage.removeItem(item);
}

Storage.saveSessionItem = function(item,data){
    window.sessionStorage.setItem(item,JSON.stringify(data));
}
Storage.getSessionItem = function(item){
    return JSON.parse(window.sessionStorage.getItem(item));
}
Storage.removeSessionItem = function(item){
    window.sessionStorage.removeItem(item);
}

export default Storage;
