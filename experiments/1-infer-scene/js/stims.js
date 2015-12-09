
var animals = _.shuffle(["bird","bug","fish","flower"]);

var colors = ["blue","green","red","yellow"];

var verb = ["is","not"];

var verbs = [
		{"verb":"is", "v_type":"is"},
		{"verb":"isn't", "v_type":"not"}								
];

var determiners = ["The","A"];

var stimuli =  makeStims();

function makeStims() {
	stims = [];
	basic_stims = [];

	while (basic_stims.length < 4) {
		animal1 = _.sample(animals);
		animal2 = _.sample(animals);
		color1 = _.sample(colors);
		color2 = _.sample(colors);
		if (animal1!=animal2) {
			if (color1!=color2) {
				basic_stims.push(
						{
							"animal1":animal1,
							"animal2":animal2,
							"color1":color1,
							"color2":color2
						}
					);
			}
		}
	}

	for (var i=0; i<basic_stims.length; i++) {
		// animal1 = animals[i];
		// animal2 = _.sample(animals);
		// if (animal1!=animal2) {
		for (var j=0; j<verbs.length; j++) {
			for (var k=0; k<determiners.length; k++) {
				stims.push(
					{
						"animal1":basic_stims[i].animal1+"s",
						"animal2":basic_stims[i].animal2+"s",			
						// "animal1":animal1+"s",
						// "animal2":animal2+"s",			
						"color1":basic_stims[i].color1,
						"color2":basic_stims[i].color2,
						// "color1":"red",
						// "color2":"blue",
						"verb":verbs[j].v_type,
						"determiner":determiners[k],
						"sentence": determiners[k]+" "+basic_stims[i].animal1+" "+verbs[j].verb+" "+basic_stims[i].color1+"."
						// "sentence": determiners[k]+" "+animal1+" "+verbs[j].verb+" "+color1+"."
					}
					);	
			}
		}
	}
			
	
		
	return stims;
	
}


		// var stimuli = [
	 //  		{"sentence":"The bird is blue.","determiner":"the","verb" : "is", "animal1":"birds","animal2":"flowers","color1" : "blue", "color2" : "red"},
	 //  		{"sentence":"A bird is blue.","determiner":"a","verb" : "is", "animal1":"birds","animal2":"flowers","color1" : "blue", "color2" : "red"},
		// 	{"sentence":"The bird isn't blue.","determiner":"the","verb" : "not", "animal1":"birds","animal2":"flowers","color1" : "blue", "color2" : "red"},
	 //  		{"sentence":"A bird isn't blue.","determiner":"a","verb" : "not", "animal1":"birds","animal2":"flowers","color1" : "blue", "color2" : "red"},
		// 	{"sentence":"The flower is red.","determiner":"the","verb" : "is", "animal1":"birds","animal2":"flowers","color1" : "blue", "color2" : "red"},
	 //  		{"sentence":"A flower is red.","determiner":"a","verb" : "is", "animal1":"birds","animal2":"flowers","color1" : "blue", "color2" : "red"},
		// 	{"sentence":"The flower isn't red.","determiner":"the","verb" : "not", "animal1":"birds","animal2":"flowers","color1" : "blue", "color2" : "red"},
	 //  		{"sentence":"A flower isn't red.","determiner":"a","verb" : "not", "animal1":"birds","animal2":"flowers","color1" : "blue", "color2" : "red"}
			
		// 	]