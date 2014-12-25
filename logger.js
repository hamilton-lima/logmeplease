var log = new LogMePlease('draft');

function showCase(){
	log.debug("Never see me around");

	log.add('logger.js');

	log.debug("Now you can see");
	me('me too !!');

	log.remove('logger.js');
	log.add('another.js');

	log.debug("Now you DONT");
	me('but this one you see');
}

showCase();

log.title("log.showDate = true");
log.showDate = true;
showCase();

log.title("log.showMilisecs = true");
log.showMilisecs = true;
showCase();

log.title("log.showStack = true");
log.showStack = true;
showCase();