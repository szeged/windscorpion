// http://en.literateprograms.org/Quicksort_(JavaScript)

// http://en.literateprograms.org/LiteratePrograms:Copyrights

// Copyright . 2008 the authors listed in the page history 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is furnished
// to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software. 
	    
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// 2008/08/01
// Make it available for Webkit: Zoltan Herczeg, 2008, University of Szeged

function partition(array, begin, end, pivot)
{
	var piv=array[pivot];
	array.swap(pivot, end-1);
	var store=begin;
	var ix;
	for(ix=begin; ix<end-1; ++ix) {
		if(array[ix].leq(piv)) {
			array.swap(store, ix);
			++store;
		}
	}
	array.swap(end-1, store);

	return store;
}

Array.prototype.swap=function(a, b)
{
	var tmp=this[a];
	this[a]=this[b];
	this[b]=tmp;
}

function qsort(array, begin, end)
{
	if(end-1>begin) {
		var pivot=begin+Math.floor(Math.random()*(end-begin));

		pivot=partition(array, begin, end, pivot);

		qsort(array, begin, pivot);
		qsort(array, pivot+1, end);
	}
}

function quick_sort(array)
{
	qsort(array, 0, array.length);
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

const asize = 95000
var array = new Array(asize)

function leq(that)
{
  return this.val <= that.val
}

// ~ 0.19 sec
for (var i = 0; i < asize; i++) {
  array[i] = { "val" : rand() | (rand() << 8) | (rand() << 16), "leq" : leq }
}

quick_sort(array)

/*for (var i = 0; i < asize; i++) {
  print(array[i].val)
}*/
