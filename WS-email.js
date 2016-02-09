// http://www.js-x.com/page/javascripts__example.html?view=946

//This file retrieved from the JS-Examples archives
//http://www.js-examples.com
//1000s of free ready to use scripts, tutorials, forums.
//Author: JS-Examples - http://www.js-examples.com/ 

// 2008/08/01
// Make it available for Webkit: Zoltan Herczeg, 2008, University of Szeged

function emailCheck (emailStr) {
    var checkTLD=0;
    var knownDomsPat=/ ^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
    var emailPat=/^(.+)@(.+)$/;
    var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
    var validChars="\[^\\s" + specialChars + "\]";
    var quotedUser="(\"[^\"]*\")";
    var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
    var atom=validChars + '+';
    var word="(" + atom + "|" + quotedUser + ")";
    var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
    var matchArray=emailStr.match(emailPat);
    if (matchArray==null)
        return "The Email Address Is Invalid";
    var user=matchArray[1]; 
    var domain=matchArray[2]; 
    for (i=0; i<user.length; i++) { 
        if (user.charCodeAt(i)>127)
            return "The Username Contains Invalid Characters.";
    }
    for (i=0; i<domain.length; i++) {
        if (domain.charCodeAt(i)>127)
            return "Ths Domain Name Contains Invalid Characters.";
    }
    if (user.match(userPat)==null)
        return "The Username Is Invalid.";
    var IPArray=domain.match(ipDomainPat);
    if (IPArray!=null) {
        for (var i=1;i<=4;i++) {
            if (IPArray>255)
                return "The Destination IP Address Is Invalid.";
        }
        return true;
    }
    var atomPat=new RegExp("^" + atom + "$");
    var domArr=domain.split(".");
    var len=domArr.length;
    for (i=0;i<len;i++) {
        if (domArr[i].search(atomPat)==-1)
            return "The Domain Name Is Invalid.";
    }
    if (checkTLD && domArr[domArr.length-1].length!=2 &&
            domArr[domArr.length-1].search(knownDomsPat)==-1)
        return "The Domain Name Extension Is Invalid";
    if (len<2)
        return "The Address Is Missing A Hostname.";
    return "VALID";
}

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

function randomEmail()
{
  var _r = ""

  var _l = (rand() & 0x7) + 1;
  for (var i = 0; i < _l; i++)
    _r = _r + String.fromCharCode((rand() & 0x1F) + 97)
  if ((rand() & 0x7) != 0)
    _r = _r + "@"

  var _l = (rand() & 0x7) + 1;
  for (var i = 0; i < _l; i++)
    _r = _r + String.fromCharCode((rand() & 0xF) + 97)
  if ((rand() & 0x7) != 0)
    _r = _r + "."
  var _l = (rand() & 0x3) + 1;
  for (var i = 0; i < _l; i++)
    _r = _r + String.fromCharCode((rand() & 0xF) + 97)
  return _r
}

for (var i = 0; i < 47500; i++) {
  // ~ 0.75 sec
  emailCheck(randomEmail())
}

//print(emailCheck("joe@hotmail.com"))
//print(emailCheck("jo[e]"))
//print(emailCheck("joe@mail"))
//print(emailCheck("j@ma[i]l.mail"))
