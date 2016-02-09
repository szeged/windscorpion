/*
 *  Floyd Min Path finder.
 *  Alex Le
 *  CS417 Algorithm Analysis
 *  Prof. Holliday
 *  Sping 2006
 *  Also available online at http://math.lfc.edu/~lenm70/floyd.html or at http://alexle.net
 *
 *  2008/08/01
 *  Make it available for Webkit: Zoltan Herczeg, 2008, University of Szeged
 */

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

/*
 * Return a n x m array with all elements set to 0
 */
function _2DArray(rows,cols)
{
	var i;
	var j;
	var a = new Array(rows);
	for (i=0; i < rows; i++)
	{
		a[i] = new Array(cols);
		for (j=0; j < cols; j++)
		{
			if ((rand() & 0xF) == 0)
				a[i][j] = 999;
			else
				a[i][j] = rand() & 0xF;
		}
	}
	return(a);
}

var graphTable;

/*
 * Calculate the shortest weighted path for a graph.
 * Dynamic Programming approach using Floyd's Alg.
 */
function floyd()
{
	const n = graphTable.length;
	var k = 0;

	/* Run Floyd's Algorithm */
	for(var i= 0 ; i <n ; i++)
	{
		for(var j = 0; j < n; j++)
		{
			if( i != j ) // skip over the current row
			{
				for( k = 0; k < n; k++)
				{
					if( k != i ) // skip over the current column of iteration
					{
						t = min ( graphTable[j][k], graphTable[j][i] + graphTable[i][k]);
						graphTable[j][k] = t;
					}
				}
			}

		}

		//print("After iteration " + i + "\n");
		print2DArray(graphTable);
	}
}

/* Return the minimum of 2 numbers */
function min(a,b)
{
	return (a>=b) ? b : a;
}

/* Output a column-formatted 2D array */
function print2DArray(array)
{
	var n = array.length;
	var out;
	var i = 0;
	var j = 0;
	for( i = 0; i < n ; i++)
	{
		for( j=0; j < n; j++)
		{
			out = out + array[i][j];
			if ( j < n - 1)
				out = out + " \t";
		}
		out = out + "\n";
	}
	//print(out);
	delete out
}

// ~ 0.020 sec
for (var i = 0; i < 6; i++) {
	graphTable = _2DArray(63, 63);
	floyd();
}
