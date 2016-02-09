// http://www.js-x.com/page/javascripts__example.html?view=1061

//This file retrieved from the JS-Examples archives
//http://www.js-examples.com
//1000s of free ready to use scripts, tutorials, forums.
//Author: JS-X.com - http://js-x.com/contact/

// 2008/08/01
// Make it available for Webkit: Zoltan Herczeg, 2008, University of Szeged
/*
 * This computes the prime composite break down factors.
 */
function isPrime(_n)
{
 var _isPrime=true;
 var _sqrt=Math.sqrt(_n);
 for(var _i=2;_i<=_sqrt;_i++)
  if((_n%_i)==0) _isPrime=false;
 return _isPrime;
}

function printFactors(_v)
{
 var _r;
 if(isPrime(_v)) return _v.toString();
 else
  for(var i=2;i<=(_v/2);i++)
    if(_v%i==0 && isPrime(i))
    {
      _r=i.toString()+","+printFactors(_v/i);
      break;
    }
  return _r;
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

// ~ 0.012 sec
for (var i = 0; i < 3100; i++) {
  printFactors(rand() | (rand() << 8) | (rand() << 16))
}
