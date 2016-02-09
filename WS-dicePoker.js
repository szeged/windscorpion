// Dice poker (fun!)
// This script and many more are available free online at
// The JavaScript Source!! http://javascript.internet.com
// http://javascript.internet.com/games/dice-poker.html
//
// 2008/08/01
// Make it available for Webkit: Zoltan Herczeg, 2008, University of Szeged

char1=" "
char2=unescape("%u2022")
numbers=new Array()
ttimes=1
ttotal=0

var seed = 0xbbd1;

function rand()
{
  var a = (seed * 5) & 0xFFFF;
  // Swap bytes
  a = ((a & 0xFF) << 8) + (a >> 8);
  seed = (((seed + a) & 0xff)<<8) + (a & 0xff);
  // Return low byte
  return (a & 0xff);
}

function roll(a,b,c,d,e) {
	var j, i
	toroll=new Array(a,b,c,d,e);
	towrite=""
	towrite+='<form name="dgame"><table cellpadding=\"30\" class=\"n1\"><tr>';
	for(j=0;j<5;j++) {
		if ((j!=0)&&(j/5==Math.floor(j/5))) {
			towrite+="</tr><tr>"
		}
		if ((!toroll[j])&&(ttimes==2)) {
			number=numbers[j];
		}
		else if ((toroll[j])||(ttimes==1)) {
			number=rand() % 6
			number++;
		}
		towrite+="<td>";
		switch(number) {
			// char1 = space; char2 = dot
			case 1: holes=new Array(char1,char1,char1,char1,char2,char1,char1,char1,char1);	break;
			case 2: holes=new Array(char2,char1,char1,char1,char1,char1,char1,char1,char2);	break;
			case 3: holes=new Array(char2,char1,char1,char1,char2,char1,char1,char1,char2);	break;
			case 4: holes=new Array(char2,char1,char2,char1,char1,char1,char2,char1,char2);	break;
			case 5: holes=new Array(char2,char1,char2,char1,char2,char1,char2,char1,char2);	break;
			case 6: holes=new Array(char2,char1,char2,char2,char1,char2,char2,char1,char2);	break;
			case 7: holes=new Array(char2,char1,char1,char1,char1,char1,char1,char1,char1);	break;
		}
		towrite+='<table class="n2" border="0" cellpadding="0" cellspacing="0"><tr>';
		for(i=0;i<3;i++) {
			towrite+='<td> '+holes[i]+' </td>\n'
		}
		towrite+='</tr><tr>';
		for(i=3;i<6;i++) {
			towrite+='<td> '+holes[i]+' </td>\n'
		}
		towrite+='</tr><tr>';
		for(i=6;i<9;i++) {
			towrite+='<td> '+holes[i]+' </td>\n'
		}
		towrite+='</tr></table>'
		if(ttimes==1) {
			towrite+='<input type="checkbox" name="hold'+j+'"> Hold';
		} else {
			if(!toroll[j]) {
				towrite+='Held'
			} else if(toroll[j]) {
				towrite+=' '
			}
		}
		numbers[j]=number;
		towrite+='</td>'
	}

	if (ttimes==1) {
		ttimes++;
	} else {
		ttimes--;
	}
		towrite+='</tr></table></form>';
	//print(towrite)
	return numbers;
}

function clickbutton() {
	var k, l
	var points=0;
	var win="nothing";
	alpha=new Array("a","b","c","d","e");
	types=new Array("ones","twos","threes","fours","fives","sixes");
	if(ttimes==1) {
		x=roll(1,1,1,1,1)
	} else {
		a=rand() & 0x1
		b=rand() & 0x1
		c=rand() & 0x1
		d=rand() & 0x1
		e=rand() & 0x1
		x=roll(a,b,c,d,e);
		ones=0
		twos=0
		threes=0
		fours=0
		fives=0
		sixes=0
		//win checker
		//counts how many of each number there is
		for(k=0;k<5;k++) {
			if(x[k]==1) ones++;
			if(x[k]==2) twos++;
			if(x[k]==3) threes++;
			if(x[k]==4) fours++;
			if(x[k]==5) fives++;
			if(x[k]==6) sixes++;
		}
		//print(eval(types[0])+" ones\n"+eval(types[1])+" twos\n"+eval(types[2])+" threes\n"+eval(types[3])+" fours\n"+eval(types[4])+" fives\n"+eval(types[5])+" sixes\n");
		for(l=0;l<6;l++) {
			if(eval(types[l])==3) {
				points=1
				win="Three of a kind"
				for(m=0;m<6;m++) {
					if((eval(types[m])==2)&&(m!=l)) {
						points=3; win="Full House (3 + 2 of a kind)";
					}
				}
			}
			if(eval(types[l])==4) {
				points=4; win="Four of a kind";
			}
			if(eval(types[l])==5) {
				points=10; win="Five of a kind";
			}
			//checks for one of every number except 6
			if ((eval(types[0])==1) && (eval(types[1])==1) && (eval(types[2])==1) && (eval(types[3])==1) && (eval(types[4])==1)) {
				win="Low Straight"; points="5"
			}
			//checks for one of every number except 1
			if ((eval(types[1])==1) && (eval(types[2])==1) && (eval(types[3])==1) && (eval(types[4])==1) && (eval(types[5])==1)) {
				win="High Straight"; points="6"
			}
		}
		ttotal+=parseInt(points);
		//print("You got "+win+"!\nThat's "+points+" points!\nTotal: "+ttotal+"Points");
	}
}

// A little uncommon JS code
// ~ 0.016s
var ctr = { "val" : 0, "debug" : 0, "click" : clickbutton }
for ( ctr["val"] = 0; ctr["val"] < 3400; ctr["val"]++) {
	++ctr["debug"]
	ctr["click"]()
	ctr["click"]()
	--ctr["debug"]
}
//print(ctr["debug"])
delete ctr["debug"]

//print("Total: "+ttotal+" points");
