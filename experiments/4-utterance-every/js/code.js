
	  		var scale = 0.28;
		    //properties sampled around specified mean:
			var bugs = new Ecosystem.Genus("bug", {
				"col4":{"mean":"#FFF","var":0},
				"tar2":false,
				"var":0 //overall variance (overwritten by any specified variances)
			});

			var birds = new Ecosystem.Genus("bird", {
				// "col6":{"mean":"#FFF","var":0},
				"var":0 //overall variance (overwritten by any specified variances)
			});

			var flowers = new Ecosystem.Genus("flower", {
				// "col1":{"mean":"#FF0000","var":0},
				"col4":{"mean":"#FFF","var":0},
				// "col5":{"mean":"#0000FF","var":0},
				"tar2":false,
				"var":0 //overall variance (overwritten by any specified variances)
			});

			var fishs = new Ecosystem.Genus("fish", {
				"var":0 //overall variance (overwritten by any specified variances)
			});

			var creatures = {"bugs" : bugs,"birds" : birds,"flowers" : flowers,"fishs" : fishs};

function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    start : function() {
    	//draw_rock("intro_rock");
    },
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.bird_intro = slide({
	  	name : "bird_intro",

		present : _.shuffle(stimuli),
	  	
	  	present_handle : function(stim) {
	      $(".qerr").hide();
	      this.stim = stim;
		    //properties sampled around specified mean:

		    var names_list = _.shuffle(names);

		    var name = names_list[0];

	      	$(".name").html(name);

		    $(".sentence").html("\""+stim.sentence+"\"");

		  //   var scenes = _.sample([
				// {"label" : "1111", "a1" : stim.animal1, "c1" : stim.color1, "a2" : stim.animal1, "c2" : stim.color1},
				// {"label" : "1112", "a1" : stim.animal1, "c1" : stim.color1, "a2" :	stim.animal1, "c2" : stim.color2},
				// {"label" : "1212", "a1" : stim.animal1, "c1" : stim.color2, "a2" :	stim.animal1, "c2" : stim.color2},
				// // {"label" : "2121", "a1" : stim.animal2, "c1" : stim.color1, "a2" :	stim.animal2, "c2" : stim.color1},
				// // {"label" : "2122", "a1" : stim.animal2, "c1" : stim.color1, "a2" :	stim.animal2, "c2" : stim.color2},
				// // {"label" : "2222", "a1" : stim.animal2, "c1" : stim.color2, "a2" :	stim.animal2, "c2" : stim.color2},
				// {"label" : "1121", "a1" : stim.animal1, "c1" : stim.color1, "a2" :	stim.animal2, "c2" : stim.color1},
				// {"label" : "1122", "a1" : stim.animal1, "c1" : stim.color1, "a2" :	stim.animal2, "c2" : stim.color2},
				// {"label" : "1221", "a1" : stim.animal1, "c1" : stim.color2, "a2" :	stim.animal2, "c2" : stim.color1},
				// {"label" : "1222", "a1" : stim.animal1, "c1" : stim.color2, "a2" :	stim.animal2, "c2" : stim.color2}
				// ]);

			// for (var i=0; i<scenes.length; i++) {
			// 	var order = _.shuffle(["a","b"])
			// 	creatures[scenes[i].a1].draw("creature_"+i+"_"+order[0], {"col1" : scenes[i].c1, "col2" :  scenes[i].c1, "col3" : scenes[i].c1, "tar1" : true, "tar2" : false}, scale);
			// 	creatures[scenes[i].a2].draw("creature_"+i+"_"+order[1], {"col1" : scenes[i].c2, "col2" :  scenes[i].c2, "col3" : scenes[i].c2, "tar1" : true, "tar2" : false}, scale);
			// }
			var order = _.shuffle(["a","b"])
			creatures[stim.scene.a1].draw("creature_"+"0"+"_"+order[0], {"col1" : stim.scene.c1, "col2" :  stim.scene.c1, "col3" : stim.scene.c1, "tar1" : true, "tar2" : false}, scale);
			creatures[stim.scene.a2].draw("creature_"+"0"+"_"+order[1], {"col1" : stim.scene.c2, "col2" :  stim.scene.c2, "col3" : stim.scene.c2, "tar1" : true, "tar2" : false}, scale);
        	
			var sentenceorder = _.shuffle(["the_is","the_not","a_is","a_not","every_is","every_not"]); 

	      	var sentences = {
		      	"the_is":"The "+ stim.animal1_name +" is "+ stim.color1+".",
		      	"the_not":"The "+ stim.animal1_name +" isn't "+ stim.color1+".",
		      	"a_is": "A "+ stim.animal1_name +" is "+ stim.color1+".",
		      	"a_not": "A "+ stim.animal1_name +" isn't "+ stim.color1+".",
		      	"every_is": "Everything is "+ stim.color1+".",
		      	"every_not": "Everything is not "+ stim.color1+"."
		      }; 

		    var radiotablehtml = "";

		    for (var i=1; i<7; i++) {
				radiotablehtml = radiotablehtml + '<tr><td align="left"><input type="radio" name="radioresponse" class="radio'+i+'" value="'+sentenceorder[i-1]+'"/><label for="radio'+i+'">'+" \""+sentences[sentenceorder[i-1]]+'\"</label></td></tr>';	
	      		}

	      	$("#bird_radiotable").html(radiotablehtml);		




			for (var i=0; i < 10; i++) {	
				// $("#cell_" + i).hover(function(){
    //                         $(this).fadeTo(10,0.5);   
    //                         },
    //                         function(){
    //                         $(this).fadeTo(10,1);       
    //                         });
	        	$(".radio" + i).click(function(index) {
			          return function() {
			            $(".cell").unbind("click");
			            // $(".cell").empty();
			            // $("#cell_" + i).empty();
			            $(".image").empty();
			            exp.data_trials.push({
			              "scene": stim.scene.label,
			              "animal1" : stim.animal1,
			              "color1" : stim.color1,
			              "animal2" : stim.animal2,
			              "color2" : stim.color2,
						  "response" : $("input[name=radioresponse]:checked").val(),
			              "slide_number" : exp.phase
			            });
			            setTimeout(function(){
			            _stream.apply(_s);
			          }, 500);
			          }
			        }(i));
        	      }
				    
		    },



	    button : function() {
	    	 _stream.apply(this);
			      // exp.go(); //use exp.go() if and only if there is no "present" data.
			    } //use exp.go() if and only if there is no "present" data.
  			});

		// 	var q1text = stim[0].question;
		// 	var q2text = stim[1].question;
		// 	var q3text = stim[2].question;
		// 	var q4text = stim[3].question;

		// 	$("#creature_q1").html(q1text);
		// 	$("#creature_q2").html(q2text);
		// 	$("#creature_q3").html(q3text);
		// 	$("#creature_q4").html(q4text);

	 //  	},


	 //  	button : function() {
	 //  		var ok_to_go_on = true;
	 //  		if ($("#creature_q1_a").val().length < 1) {
	 //  			ok_to_go_on = false;
	 //  		}
		// 	if ($("#creature_q2_a").val().length < 1) {
	 //  			ok_to_go_on = false;
	 //  		}	  		
		// 	if ($("#creature_q3_a").val().length < 1) {
	 //  			ok_to_go_on = false;
	 //  		}	  			
		// 	if ($("#creature_q4_a").val().length < 1) {
	 //  			ok_to_go_on = false;
	 //  		}	  			
	 //  		if (ok_to_go_on) {  		  		
	 //        	this.log_responses();
	 //        	_stream.apply(this);
	 //        } else {
	 //        	$(".qerr").show();
	 //        }
	 //      },

	 //    log_responses : function() {
	 //      exp.data_trials.push({
		// 	"question1" : this.stim[0].type,
	 //        "question1_response" : $("#creature_q1_a").val(),
	 //        "question1_answer" : this.stim[0].answer,
	 //        "question2" : this.stim[1].type,
	 //        "question2_response" : $("#creature_q2_a").val(),
	 //        "question2_answer" : this.stim[1].answer,	   
	 //        "question3" : this.stim[2].type,
	 //        "question3_response" : $("#creature_q3_a").val(),
	 //        "question3_answer" : this.stim[2].answer,  
	 //        "question4" : this.stim[3].type,
	 //        "question4_response" : $("#creature_q4_a").val(),
	 //        "question4_answer" : this.stim[3].answer, 
	 //        "item" : this.name,
	 //        "freq" : exp.frequencies[1].freq
	 //      });
	 //    }
	 //  });

  slides.bird_slider = slide({
	    name : "bird_slider",
	    /* trial information for this block
	     (the variable 'stim' will change between each of these values,
	      and for each of these, present_handle will be run.) */
	    present : _.shuffle([
	    	{full: "no", type: "indirect", evidence: "you look out the window and all you see of a bird through the fog is its tail:",color:"#FF0000",path: "m 132.22211,134.52966 c 191.10251,80.71415 113.01869,78.03341 2.84222,9.61677 63.9837,23.64523 215.07401,187.78265 -1.1188,7.99662 123.08528,103.16261 103.98773,125.24613 -5.52127,2.16374 51.46787,47.51483 104.03178,177.03548 -9.92371,-3.66861 82.41766,117.57582 24.7014,98.14746 -11.75615,-7.14977"},
	    	{full: "no", type: "direct", evidence: "you look out the window and all you see of a bird through the fog is its crest:",color:"#FF0000",path: "M 68.998189,51.444834 C 29.266918,8.8463783 54.774859,-23.966711 79.178014,49.452194 55.45242,-32.318599 86.17406,3.34127 87.47028,48.404097 c -6.752454,-60.351739 18.46215,-69.484532 8.33515,2.21967 11.22067,-81.250238 27.66133,-41.2482689 8.12437,4.603553 21.46103,-73.743476 42.28583,-75.437662 4.9047,6.30698 27.0571,-72.938091 69.57097,-85.29053 -0.2684,4.974874 97.61204,-111.124987 45.76332,-19.663736 -1.94517,4.833631 135.25621,-91.227061 55.46185,-14.557556 -0.46447,1.037058 36.0982,-22.141872 172.89205,-35.881013 -2.41942,2.363961 159.97243,-29.73347 94.71493,-9.896787 20.5901,1.992641 92.68096,-11.725204 80.48663,-3.936569 16.60419,3.892767 72.51341,-9.249468 52.48157,10.901133 19.31953,7.7745 -6.13279,-3.190188 -10.16888,-8.899088 -56.17929,-13.671245 1.40105,-1.235818 3.15887,0.05674 4.68998,-13.053739 C 94.41531,40.704404 80.375709,51.076633 68.998189,51.444834 z"},
	    	{full: "no", type: "report", evidence: "your friend outside the spaceship tells you he sees a "+exp.bird_a+".",color:"#000",transform:"t-840,-1475.000000s.08,-.07",path: "M919 3207 c-67 -28 -102 -52 -150 -104 -107 -115 -170 -254 -205 -446 -17 -98 -19 -310 -3 -404 54 -328 232 -569 436 -590 58 -6 58 -5 28 -93 -14 -40 17 -28 -410 -155 -383 -113 -497 -159 -577 -236 -32 -31 -38 -42 -38 -79 0 -57 24 -148 55 -202 65 -116 154 -187 396 -314 90 -47 170 -93 177 -102 8 -10 11 -32 9 -52 -4 -27 9 -65 55 -170 33 -74 66 -144 73 -154 26 -35 42 -12 48 68 3 50 14 93 30 128 l25 53 2 -35 c2 -19 5 -98 9 -175 l6 -140 40 -3 40 -3 1 383 c0 213 6 410 11 443 l11 60 1 -55 c1 -30 12 -201 26 -380 14 -179 25 -353 25 -387 l0 -63 46 0 45 0 -5 43 c-3 23 -7 107 -10 187 l-5 145 25 -55 c17 -36 28 -80 31 -127 7 -91 17 -107 44 -72 36 45 138 284 132 308 -12 45 11 77 170 240 90 91 181 189 204 216 58 71 132 189 173 274 l35 73 -40 36 c-100 88 -317 152 -684 203 -56 8 -95 18 -98 26 -3 7 4 44 16 82 12 38 21 76 21 84 0 8 19 26 43 40 269 158 390 680 258 1112 -38 122 -104 235 -182 313 -96 94 -230 125 -340 79z m198 -148 c72 -45 150 -163 190 -289 57 -183 57 -467 0 -650 -65 -205 -195 -336 -312 -314 -160 30 -295 323 -295 639 0 417 217 736 417 614z m-130 -1603 c-10 -24 -56 -257 -67 -335 -17 -120 -40 -417 -41 -526 -1 -118 -11 -199 -21 -172 -4 9 -51 39 -105 65 -171 84 -416 217 -478 259 -120 81 -193 183 -214 298 -14 76 -3 94 99 152 77 44 213 91 600 207 247 73 234 70 227 52z m256 -46 c328 -52 489 -97 576 -160 l41 -30 -34 -68 c-113 -225 -420 -554 -609 -653 -49 -25 -85 -52 -96 -70 -17 -28 -18 -25 -36 239 -20 285 -25 610 -12 705 10 67 -1 65 170 37z" },//{evidence: "report"}
	    	{full: "yes", type: "full", evidence: "you look out the window and see a bird through the fog.",path: ""}
	    	]),
	    //this gets run only at the beginning of the block
	    present_handle : function(stim) {
	      $(".err").hide();
	      this.stim = stim; //I like to store this information in the slide so I can record it later.

	      $(".evidence1").html("Imagine "+stim.evidence);
	      
	      $(".evidence1").html("Imagine "+stim.evidence);
	      if (stim.full=="no") {
			var paper = new Raphael(document.getElementById("bird_evidence2"),250,250);
			var rect = paper.rect(0, 0, 250,250);
			// rect.attr("fill", "#383838");
			var p = stim.path;
			var mark = paper.path(p);	    
			mark.attr("fill",stim.color);
			mark.transform(stim.transform);
			} else {
				birds.draw("bird_evidence2", {"tar1" : true, "tar2" : true}, .75);
			}
	      //draw_rock("bird_rock");
	      var sentenceorder = _.shuffle(["must","bare","might"]); 

	      var sentences = {
	      	"must":"The bird in the fog must be a "+ exp.bird_a+".",
	      	"bare":"The bird in the fog is a "+ exp.bird_a+".",
	      	"might": "The bird in the fog might be a "+ exp.bird_a+"."
	      }; 

	      var radiotablehtml = "";

	      for (var i=1; i<4; i++) {
			radiotablehtml = radiotablehtml + '<tr><td align="left"><input type="radio" name="radioresponse" class="radio'+i+'" value="'+sentenceorder[i-1]+'"/><label for="radio'+i+'">'+sentences[sentenceorder[i-1]]+'</label></td></tr>';	
      		}

      	$("#bird_radiotable").html(radiotablehtml);		

	    },
	    button : function() {
	      if ($("input[name=radioresponse]:checked").val() == undefined) {
	        $(".err").show();
	      } else {
	        this.log_responses();
	        $(".evidence2").empty();
	        /* use _stream.apply(this); if and only if there is
	        "present" data. (and only *after* responses are logged) */
	        _stream.apply(this);
	      }
	    },
	    log_responses : function() {
	      exp.data_trials.push({
	        "evidence_type" : this.stim.type,
	        "response" : $("input[name=radioresponse]:checked").val(),
	        "item" : this.name,
	        "freq" : exp.frequencies[0].freq
	      });
	    }
	  });

	slides.subj_info =  slide({
    	name : "subj_info",
		    submit : function(e){
		      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
		      exp.subj_data = {
		        language : $("#language").val(),
		        enjoyment : $("#enjoyment").val(),
		        asses : $('input[name="assess"]:checked').val(),
		        age : $("#age").val(),
		        gender : $("#gender").val(),
		        education : $("#education").val(),
		        comments : $("#comments").val(),
		      };
		      exp.go(); //use exp.go() if and only if there is no "present" data.
		    }
		  });

		slides.thanks = slide({
		    name : "thanks",
		    start : function() {
		      exp.data= {
		          "trials" : exp.data_trials,
		          "catch_trials" : exp.catch_trials,
		          "system" : exp.system,
		          //"condition" : exp.condition,
		          "subject_information" : exp.subj_data,
		          "time_in_minutes" : (Date.now() - exp.startT)/60000
		      };
		      setTimeout(function() {turk.submit(exp.data);}, 1000);
		    }
		});

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.critters = _.shuffle(["bird","bug","flower","fish"])
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

	// exp.species = _.shuffle([
	//   "wug", "dax", "fep", "tig", "speff", "zib", "gub", "wost", "wock", "thog",
	//   "snim", "ript", "quog", "polt", "poch", "murp", "mulb", "mork", "mopt", "monx",
	//   "mone", "moge", "lide", "hoil", "hoff", "hisp", "hinx", "hife", "hett", "fraw",
	//   "fing", "fick", "blim", "zop", "blick"
	// ]);

	// function plural(word) {
	//   if (/dax|poch|monx|hinx/.test(word)) {
	//     return(word + "es");
	//   } else if (/fish|thorns|fangs|whiskers|antennae|wings|spots/.test(word)) {
	//     return word;
	//   } else {
	//     return(word + "s");
	//   }
	// };

	// exp.bird_a = exp.species[0];
	// exp.bird_b = exp.species[1];
	// exp.bug_a = exp.species[2];
	// exp.bug_b = exp.species[3];
	// exp.flower_a = exp.species[4];
	// exp.flower_b = exp.species[5];
	// exp.fish_a = exp.species[6];
	// exp.fish_b = exp.species[7];	
	// exp.birds_a = plural(exp.bird_a);
	// exp.birds_b = plural(exp.bird_b);
	// exp.bugs_a = plural(exp.bug_a);
	// exp.bugs_b = plural(exp.bug_b);
	// exp.flowers_a = plural(exp.flower_a);
	// exp.flowers_b = plural(exp.flower_b);
	// exp.fishs_a = plural(exp.fish_a);
	// exp.fishs_b = plural(exp.fish_b);

	 // $(".bird_a").html(exp.bird_a);
	 // $(".bird_b").html(exp.bird_b);  
	 // $(".birds_a").html(plural(exp.bird_a));
	 // $(".birds_b").html(plural(exp.bird_b));  
	 // $(".bug_a").html(exp.bug_a);
	 // $(".bug_b").html(exp.bug_b);  
	 // $(".bugs_a").html(plural(exp.bug_a));
	 // $(".bugs_b").html(plural(exp.bug_b));  
	 // $(".flower_a").html(exp.flower_a);
	 // $(".flower_b").html(exp.flower_b);  
	 // $(".flowers_a").html(plural(exp.flower_a));
	 // $(".flowers_b").html(plural(exp.flower_b));  
	 // $(".fish_a").html(exp.fish_a);
	 // $(".fish_b").html(exp.fish_b); 
	 // $(".fishs_a").html(plural(exp.fish_a));
	 // $(".fishs_b").html(plural(exp.fish_b));   
  //blocks of the experiment:
  // exp.structure=["i0", "instructions",exp.critters[0]+'_intro',exp.critters[0]+'_slider',exp.critters[1]+'_intro',exp.critters[1]+'_slider',exp.critters[2]+'_intro',exp.critters[2]+'_slider',exp.critters[3]+'_intro',exp.critters[3]+'_slider','subj_info', 'thanks'];
  exp.structure=["i0", "instructions",'bird_intro','subj_info', 'thanks'];


  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}