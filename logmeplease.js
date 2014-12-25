function LogMePlease(name) {
	
	this.active = true;
	this.showMilisecs = false;
	this.showStack = false;
	this.showDate = false;
	this.name = name;
	this.debuggers = {};

	this.title = function(message){
		if(this.active){
			console.log("*** " + message);
		}		
	}
	
	this.debug = function(message){

		if(!this.isInTheDebuggerList()){
			return;
		}

		if(this.active){
		
			var preffix = '[' + this.name;
			var d = new Date();

			if( this.showDate ){
				preffix += ' ' + d.toUTCString();
			}
			
			if( this.showStack ){
				preffix += ' (' + this.getCleanStack() + ') ';
			}

			if( this.showMilisecs ){
				preffix += ' ' + d.getTime();
			}
			preffix += '] ';

			console.log(preffix + message);
		}
	}

	// check if there is any of the 
	// debuggers strings in the stacktrace	
	this.isInTheDebuggerList = function(){

		var err = new Error();
		var lines = err.stack.split("\n");
		
		for(d in this.debuggers){
			for(l in lines){
				if(lines[l].indexOf(this.debuggers[d]) >= 0){
					return true;
				}	
			}
		}

		return false;
	}
	
	// returns the clean stacktrace without the library lines
	this.getCleanStack = function(){

		var err = new Error();
		var lines = err.stack.split("\n");

		var url = document.URL;
		url = url.substring(0, url.lastIndexOf("/")+1);
		
		for(key in lines){

			if(lines[key] == "Error"){
				delete lines[key];
				continue;
			}

			if(lines[key].indexOf("at LogMePlease.") >= 0){
				delete lines[key];
				continue;
			}

			if(lines[key].indexOf("at Object.InjectedScript") >= 0){
				delete lines[key];
				continue;
			}
			
			lines[key] = lines[key].replace(url, "");
			lines[key] = lines[key].trim();
		}

		var result = "";
		for(key in lines){
			if( lines[key] ){
				result += lines[key] + " ";
			}
		}
		
		return result;
	}
	
	this.add = function(name){
		this.debuggers[name] = name;
	}

	this.remove = function(name){
		delete this.debuggers[name];
	}

}