// http://www.student.cs.uwaterloo.ca/~semery/huffman.html
//
// 2008/08/01
// Make it available for Webkit: Zoltan Herczeg, 2008, University of Szeged

// BinaryHelper Constructor
function BinaryHelper( input )
{	
	// 1 Argument Constructor
	if ( arguments.length == 1 )
	{	
		this.input = new Array( input.length );
		for ( var i = 0; i < input.length; i++ )
		{
			this.input[i] = input.charAt(i);
		}		
	} else
	{ throw "Illegal Argument Exception";
	}
}


BinaryHelper.prototype.inputToBinary = function BinaryHelper_inputToBinary()
{
	var aChar = 0x0;
	var output = "";
	var numBits = 8;
	while ( this.input.length > 0 )
	{
		// Tell how many bits to read from the last set
		if ( this.input.length < 8 )
		{
			numBits = this.input.length;
		}
			
		for ( var i = 0; i < numBits; i++ )
		{
			aChar <<= 1;
			var bit = this.input.shift();
			if ( bit != null && bit == "1" )
			{
				aChar = aChar | 0x1;
				
			}
		}
		output += String.fromCharCode(aChar);
		if ( this.input.length == 0 )
		{
			output += String.fromCharCode(numBits);
		}
		aChar = 0x0;
	}
	return output;
}

BinaryHelper.prototype.inputToASCII = function BinaryHelper_inputToASCII()
{
	var aChar = 0x0;
	var output = "";
	var numBits;
	if ( this.input.length <= 0 )
		return "";
	numBits = this.input.pop().charCodeAt(0);
	do {
		aChar = this.input.pop().charCodeAt(0);
		for ( var i = 0; i < numBits; i++ )
		{
			if ( (aChar & 0x01) == 1 )
			{
				output = "1" + output;				
			} else
			{
				output = "0" + output;			
			}
			aChar >>= 1;
		}
		aChar = 0x0;
		numBits = 8;
	} while ( this.input.length > 0 )
	return output;
}

// Node Constructor
function Huff( input )
{	
	// 1 Argument Constructor
	if ( arguments.length == 1 )
	{	
		this.input = new Array( input.length );
		for ( var i = 0; i < input.length; i++ )
		{
			this.input[i] = input.charCodeAt(i);
		}
		this.enc = new Array( Huff.NUM_CHARS );
		this.freq = new Array( Huff.NUM_CHARS );
		for ( var i = 0; i < Huff.NUM_CHARS; i++ )
		{
			this.freq[i] = 1;
			this.enc[i] = "";
		}
		this.consumedInput = 0;
		this.length = this.input.length;
			
	} else
	{ throw "Illegal Argument Exception";
	}
}

Huff.NUM_CHARS = 256;

Huff.prototype.decompress = function Huff_decompress()
{	// Build initial tree and then reset the frequencies
	var tree = this.buildTree();

	var resultString = "";

	var block = 0;
	var t = tree;
	while ( this.input.length != 0 )
	{	while ( this.consumedInput < 100*block )
		{	var c = this.findChar( t );
			if ( this.input.length == 0 )
			{	resultString += String.fromCharCode(c);
				return resultString;
			}
			resultString += String.fromCharCode(c);
		}
		block += 1;
		t = this.buildTree();
	}
	return resultString;
}


Huff.prototype.compress = function Huff_compress()
{	//Build Initial Tree
	this.buildTree();
	
	var resultString = "";
	
	var blocks = Math.floor((this.input.length + 99) / 100);
	this.consumedInput = 0;
	
	for ( var b = 1; b <= blocks; b++ )
	{	
		while ( this.consumedInput < 100*b && this.input.length != 0 )
		{	
			var c = this.input.shift();
			if ( this.input.length >= 0 )
			{	
				this.freq[ c ] += 10;
				resultString += this.enc[ c ];
				this.consumedInput += 1;
			}
		}
		if ( this.input.length != 0 )
		{
			this.buildTree();
		}
	}
	
	return resultString;
}

Huff.prototype.buildTree = function Huff_buildTree()
{	// Create the leaf nodes
	var leaves = new Array( Huff.NUM_CHARS );
	for (var i = 0; i < Huff.NUM_CHARS; i++)
	{
		leaves[i] = new Node( null, null, this.freq[i], i );
	}
	
	// Push them onto the heap
	var q = new PriorityQueue( Node.
	sortFunc, new Array() );
	for (var i = 0; i < Huff.NUM_CHARS; i++)
	{
		q.push( leaves[i] );
	}
	
	// Build the Huffman Tree
	while ( q.size() > 1 )
	{	var n1 = q.top();
		var n2 = q.top();
		q.push( new Node( n1, n2, n1.getVal() + n2.getVal(), null ) );
	}
	
	//q.top().print();
	
	// Find the new encodings based on this tree
	this.findEncodings( q.peek(), "");
	return q.top();
}


Huff.prototype.findChar = function Huff_findChar( head )
{	if ( head.getLC() == null && head.getRC() == null )
	{	var c = head.getChar();
		this.freq[ c ] += 10;
		this.consumedInput += 1;
		return c;
	} else
	{	var nextChar = String.fromCharCode(this.input.shift());
		if (nextChar == '0')
			return this.findChar( head.getLC() );
		else
			return this.findChar( head.getRC() );
	}
	return '0';
}

Huff.prototype.findEncodings = function Huff_findEncodings( head, s )
{
	// If not at a leaf node
	// 0 = left, 1 = right
	if ( head.getLC() != null && head.getRC() != null )
	{	this.findEncodings( head.getLC(), s + "0" );
		this.findEncodings( head.getRC(), s + "1" );
	} else {
		// Leaf node so save the encoding
		var c = head.getChar();
		this.enc[ c ] = s;
	}
}


Huff.prototype.getFreq = function Huff_getFreq(i)
{	return this.freq[i];
}

Huff.prototype.getEnc = function Huff_getEnc(i)
{	return this.enc[i];
}

Huff.prototype.getLengthOfInput = function Huff_getLengthOfInput()
{	return this.length;
} 

// Node Constructor
function Node( leftChild, rightChild, value, character )
{	
	// 0 Argument Constructor
	if ( arguments.length == 0 )
	{	
		this.lc = null;
		this.rc = null;
		this.val = 0;
		this.c = '0';	
	}
	// 4 Argument Constructor
	else if ( arguments.length == 4 )
	{
		this.lc = leftChild;
		this.rc = rightChild;
		this.val = value;
		this.c = character;
		
	} else
	{ throw "Illegal Argument Exception";
	}
}

Node.prototype.getChar = function Node_getChar()
{
	return this.c;
}

Node.prototype.getVal = function Node_getVal()
{
	return this.val;
}

Node.prototype.getLC = function Node_getLC()
{
	return this.lc;
}

Node.prototype.getRC = function Node_getRC()
{
	return this.rc;
}

Node.prototype.toString = function Node_toString()
{
	var printString = "(" + this.val + "," + this.c + ")[";
	if ( this.lc != null )
	{
		printString += this.lc.toString();
	}
	printString += "]["
	if ( this.rc != null )
	{
		printString += this.rc.toString();
	}
	printString += "]"
	
	return printString;
}

Node.sortFunc = function Node_sortFunc(leftNode, rightNode)
{
	return leftNode.getVal() - rightNode.getVal();
}

// PriorityQueue Constructor
function PriorityQueue( sortFunc, initialArray )
{
	// 0 Argument Constructor
	if ( arguments.length == 0 )
	{	
		this.sortFunction = null;
		this.array = new Array();
		
	}
	// 2 Argument Constructor
	else if ( arguments.length == 2 )
	{
		this.sortFunction = sortFunc;
		this.array = initialArray;
		
	} else
	{ throw "Illegal Argument Exception";
	}
}

PriorityQueue.prototype.doSort = function PriorityQueue_doSort()
{	
	if ( this.sortFunction != null )
	{
		this.array.sort( this.sortFunction );
		
	} else
	{
		this.array.sort();
		
	}
}

PriorityQueue.prototype.push = function PriorityQueue_push(obj)
{
	this.array.push(obj);
	this.doSort();
}

PriorityQueue.prototype.top = function PriorityQueue_top()
{
	return this.array.shift();
}

PriorityQueue.prototype.peek = function PriorityQueue_peek()
{
	var temp = this.array.shift();
	this.array.unshift( temp );
	return temp;
}

PriorityQueue.prototype.isEmpty = function PriorityQueue_isEmpty()
{
	return ( this.array.length == 0 );
}

PriorityQueue.prototype.toString = function PriorityQueue_toString()
{
	return this.array.toString();
}

PriorityQueue.prototype.size = function PriorityQueue_size()
{
	return this.array.length;
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

var str = "";

// ~ 0.006 sec
for (var i = 0; i < 310; i++) {
  code = rand();
  if (code >= 128)
    str = str + 'a'
  else if (code >= 64)
    str = str + 'b'
  else if (code >= 32)
    str = str + 'c'
  else if (code >= 16)
    str = str + 'd'
  else if (code >= 8)
    str = str + 'e'
  else if (code >= 4)
    str = str + 'f'
  else if (code >= 2)
    str = str + 'g'
  else if (code >= 1)
    str = str + 'h'
  else
    str = str + 'i'
}

h = new Huff( str );
result = h.compress();
//print( result.length )

helper = new BinaryHelper( result )
result = helper.inputToBinary()
helper = new BinaryHelper( result )
result = helper.inputToASCII()
//print( result )

h = new Huff( result );
result = h.decompress();
//if (result == str) print("OK!"); else print("FAILED!")
