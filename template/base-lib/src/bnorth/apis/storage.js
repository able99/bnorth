let Storage = {};

Storage.saveItem = function(item,data){
	window.localStorage.setItem(item,JSON.stringify(data));
}
Storage.getItem = function(item){
    let val = window.localStorage.getItem(item);
    try{
	   return JSON.parse(window.localStorage.getItem(item));
    }catch(e){
        return val;
    }
}
Storage.save = function(item,data){
    window.localStorage.setItem(item,data);
}
Storage.get = function(item){
    let val = window.localStorage.getItem(item);
    return val;
}
Storage.removeItem = function(item){
	window.localStorage.removeItem(item);
}
Storage.clear = function(reg){
    if(reg){
        for(let item in window.localStorage){
            if((new RegExp(reg)).test(item)){
                Storage.removeItem(item);
            }
        }
    }else{
        window.localStorage.clear();
    }
}

Storage.saveSessionItem = function(item,data){
    window.sessionStorage.setItem(item,JSON.stringify(data));
}
Storage.getSessionItem = function(item){
    let val = window.sessionStorage.getItem(item)||'{}';
    try{
        return JSON.parse(window.sessionStorage.getItem(item));
    }catch(e){
        return val;
    }
}
Storage.removeSessionItem = function(item){
    window.sessionStorage.removeItem(item);
}
Storage.clearSession = function(reg){
    if(reg){
        for(let item in window.sessionStorage){
            if((new RegExp(reg)).test(item)){
                Storage.removeSessionItem(item);
            }
        }
    }else{
        window.sessionStorage.clear();
    }
}

export default Storage;
