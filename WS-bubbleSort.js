// http://www.js-x.com/page/javascripts__example.html?view=186

// This file retrieved from the JS-Examples archives
// http://www.js-examples.com
// 1000s of free ready to use scripts, tutorials, forums.
// Author: unknnown - http://www.js-examples.com/ 

// 2008/08/01
// Make it available for Webkit: Zoltan Herczeg, 2008, University of Szeged

function BubbleSortUp(arrayName,length) 
{ 
    for (var i=0; i<(length-1); i++) 
    { 
        for (var b=i+1; b<length; b++) 
        { 
            if (arrayName[b] < arrayName[i]) 
            { 
                var temp = arrayName[i]; 
                arrayName[i] = arrayName[b]; 
                arrayName[b] = temp; 
            } //end-if 
        } //end for-loop 
    } //end for-loop 
    return void(0)
} // end fn BubbleSortUp 

function BubbleSortDown(arrayName,length) 
{ 
    for (var i=0; i<(length-1); i++) 
    { 
        for (var b=i+1; b<length; b++) 
        { 
            if (arrayName[b] > arrayName[i]) 
            { 
                var temp = arrayName[i]; 
                arrayName[i] = arrayName[b]; 
                arrayName[b] = temp; 
            } //end-if 
        } //end for-loop 
    } //end for-loop 
    return void(0)
} // end fn BubbleSortDown 

function showArray(text,arrayName,length) 
{ 
    print(text + ': '); 
    for (var i=0; i<length; i++) 
        {print(arrayName[i]);} 
    return void(0)
} //end fn showArray 

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

var array1 = new Array()
var array2 = new Array()

// ~ 0.016 sec
for (var i = 0; i < 4700; i++) {
  array1[i] = rand() | (rand() << 8)
  array2[i] = rand() | (rand() << 8)
}

//showArray('Unsorted',array1,array1.length); 
BubbleSortDown(array1,array1.length); 
//showArray('Sorted-Down',array1,array1.length); 

//showArray('Unsorted',array2,array2.length); 
BubbleSortUp(array2,array2.length); 
//showArray('Sorted-Up',array2,array2.length); 

