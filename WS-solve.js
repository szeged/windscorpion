// http://www.js-x.com/page/javascripts__example.html?view=1068

//This file retrieved from the JS-Examples archives
//http://www.js-examples.com
//1000s of free ready to use scripts, tutorials, forums.
//Author: JS-X.com - http://js-x.com/contact/

// 2008/08/01
// Make it available for Webkit: Zoltan Herczeg, 2008, University of Szeged

function reduce(_e)
{
  var _t=_e;/* do this incase there is no math operator - just return the number */
  var _order=new Array("+","-","*","/");
  var _doOnce=true; /* only do one reduction per invocation */
  for(var i=0;i<_order.length;i++)
  {
    if(_doOnce && _e.indexOf(_order[i])!=-1)
    {
      _doOnce=false; /* don't do again */
      var _x=_e.split(_order[i]);
      switch (_order[i])
      {
        case "+": _t=parseInt(reduce(_x[0]))+parseInt(reduce(_x[1]));break;
        case "-": _t=parseInt(reduce(_x[0]))-parseInt(reduce(_x[1]));break;
        case "*": _t=reduce(_x[0])*reduce(_x[1]);break;
        case "/": _t=reduce(_x[0])/reduce(_x[1]);break;
        default : _t="-ERROR-";
      }
      for(var j=2;j<(_x.length);j++)
        switch (_order[i])
        {
          case "+": _t=parseInt(_t)+parseInt(reduce(_x[j]));break;
          case "-": _t=parseInt(_t)-parseInt(reduce(_x[j]));break;
          case "*": _t=_t*reduce(_x[j]);break;
          case "/": _t=_t/reduce(_x[j]);break;
          default : _t="-ERROR-";
        }
    }
  }
  return _t;
}

function solve(expr)
{
  var _l=expr.split("=")[0]; /* left side of equation */
  var _r=expr.split("=")[1]; /* right side of equation */
  /* make 'x' be on left side */
  if(_r.indexOf("x")!=-1)
  {
    var _t; /* temp. variable used to swap values left,right */
    /* put the variable x on the left */
    _t=_l;
    _l=_r;
    _r=_t;
  }

  _r=reduce(_r); /* reduce right side */

  var _signs=new Array("+","-","*","/");
  var _signO=new Array("-","+","/","*"); /* opposite action */
  /* do each math reduction in order */
  for(var j=0;j<_signs.length;j++)
  {
    if(_l.indexOf(_signs[j])!=-1)
    {
      var _array=_l.split(_signs[j]);
      var _newL="";
      for(var i=0;i<_array.length;i++)
      {
        if(_array[i].indexOf("x")==-1)
        {
          /* we found something to subtract the reduced part from the other side */
          _r+=_signO[j]+_array[i];
          _r=reduce(_r);
        }
        else
        {
          _newL+=_array[i];
        }
      }
      _l=_newL;
    }
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

function createExpr()
{
  var _r = "" + ((rand() & 0x1F) + 1) + "*x"

  if ((rand() & 0x3) == 0)
    _r = _r + "+" + ((rand() & 0x1F) + 1) + "*x"
  if ((rand() & 0x3) == 0)
    _r = _r + "+x/2"
  if ((rand() & 0x3) == 0)
    _r = _r + "-x/3"

  _r = _r + "=" + ((rand() & 0x1F) + 1)
  if ((rand() & 0x3) == 0)
    _r = _r + "+" + ((rand() & 0x1F) + 1) + "*x"
  if ((rand() & 0x3) == 0)
    _r = _r + "-" + ((rand() & 0x1F) + 1) + "*" + ((rand() & 0x1F) + 1)
  return _r
}

for (var i = 0; i < 50000; i++)
  // ~ 0.316 sec
  solve(createExpr())

//print(solve("3*x+2*3=12+3*2"))
//print(solve("6*x+2=32"))
//print(solve("x/2=4"))
