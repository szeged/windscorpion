//Javascript version
//Paul Tero, July 2001
//http://www.shopable.co.uk/des.html
//
//Optimised for performance with large blocks by Michael Hayworth, November 2001
//http://www.netdealing.com
//
//2008/08/01
//Make it available for Webkit: Zoltan Herczeg, 2008, University of Szeged
//
//THIS SOFTWARE IS PROVIDED "AS IS" AND
//ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
//FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
//OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
//HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
//LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
//OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
//SUCH DAMAGE.

//des
//this takes the key, the message, and whether to encrypt or decrypt
function des (key, message, encrypt, mode, iv) {
  //declaring this locally speeds things up a bit
  var spfunction1 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x100,0x10004,0x10400,0,0x1010004);
  var spfunction2 = new Array (-0x7fef7fe0,-0x7fff8000,0x8000,0x108020,0x100000,0x20,-0x7fefffe0,-0x7fff7fe0,-0x7fffffe0,-0x7fef7fe0,-0x7fef8000,-0x80000000,-0x7fff8000,0x100000,0x20,-0x7fefffe0,0x108000,0x100020,-0x7fff7fe0,0,-0x80000000,0x8000,0x108020,-0x7ff00000,0x100020,-0x7fffffe0,0,0x108000,0x8020,-0x7fef8000,-0x7ff00000,0x8020,0,0x108020,-0x7fefffe0,0x100000,-0x7fff7fe0,-0x7ff00000,-0x7fef8000,0x8000,-0x7ff00000,-0x7fff8000,0x20,-0x7fef7fe0,0x108020,0x20,0x8000,-0x80000000,0x8020,-0x7fef8000,0x100000,-0x7fffffe0,0x100020,-0x7fff7fe0,-0x7fffffe0,0x100020,0x108000,0,-0x7fff8000,0x8020,-0x80000000,-0x7fefffe0,-0x7fef7fe0,0x108000);
  var spfunction3 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x20208,0x8,0x8020008,0x20200);
  var spfunction4 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x100000,0x802001,0x80,0x800000,0x2000,0x802080);
  var spfunction5 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x1000100,0x80000,0,0x40080000,0x2080100,0x40000100);
  var spfunction6 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x400010,0x20004010);
  var spfunction7 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x100000,0x800,0x4000002,0x4000800,0x800,0x200002);
  var spfunction8 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10000);

  //create the 16 or 48 subkeys we will need
  var keys = des_createKeys (key);
  var m=0, i, j, temp, temp2, right1, right2, left, right, looping;
  var cbcleft, cbcleft2, cbcright, cbcright2
  var endloop, loopinc;
  var len = message.length;
  var chunk = 0;
  //set up the loops for single and triple des
  var iterations = keys.length == 32 ? 3 : 9; //single or triple des
  if (iterations == 3) {looping = encrypt ? new Array (0, 32, 2) : new Array (30, -2, -2);}
  else {looping = encrypt ? new Array (0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array (94, 62, -2, 32, 64, 2, 30, -2, -2);}

  message += "\0\0\0\0\0\0\0\0"; //pad the message out with null bytes
  //store the result here
  result = "";
  tempresult = "";

  if (mode == 1) { //CBC mode
    cbcleft = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
    cbcright = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
    m=0;
  }

  //loop through each 64 bit chunk of the message
  while (m < len) {
    left = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
    right = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);

    //for Cipher Block Chaining mode, xor the message with the previous result
    if (mode == 1) {if (encrypt) {left ^= cbcleft; right ^= cbcright;} else {cbcleft2 = cbcleft; cbcright2 = cbcright; cbcleft = left; cbcright = right;}}

    //first each 64 but chunk of the message must be permuted according to IP
    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);
    temp = ((left >>> 16) ^ right) & 0x0000ffff; right ^= temp; left ^= (temp << 16);
    temp = ((right >>> 2) ^ left) & 0x33333333; left ^= temp; right ^= (temp << 2);
    temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);

    left = ((left << 1) | (left >>> 31)); 
    right = ((right << 1) | (right >>> 31)); 

    //do this either 1 or 3 times for each chunk of the message
    for (j=0; j<iterations; j+=3) {
      endloop = looping[j+1];
      loopinc = looping[j+2];
      //now go through and perform the encryption or decryption  
      for (i=looping[j]; i!=endloop; i+=loopinc) { //for efficiency
        right1 = right ^ keys[i]; 
        right2 = ((right >>> 4) | (right << 28)) ^ keys[i+1];
        //the result is attained by passing these bytes through the S selection functions
        temp = left;
        left = right;
        right = temp ^ (spfunction2[(right1 >>> 24) & 0x3f] | spfunction4[(right1 >>> 16) & 0x3f]
              | spfunction6[(right1 >>>  8) & 0x3f] | spfunction8[right1 & 0x3f]
              | spfunction1[(right2 >>> 24) & 0x3f] | spfunction3[(right2 >>> 16) & 0x3f]
              | spfunction5[(right2 >>>  8) & 0x3f] | spfunction7[right2 & 0x3f]);
      }
      temp = left; left = right; right = temp; //unreverse left and right
    } //for either 1 or 3 iterations

    //move then each one bit to the right
    left = ((left >>> 1) | (left << 31)); 
    right = ((right >>> 1) | (right << 31)); 

    //now perform IP-1, which is IP in the opposite direction
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);
    temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
    temp = ((right >>> 2) ^ left) & 0x33333333; left ^= temp; right ^= (temp << 2);
    temp = ((left >>> 16) ^ right) & 0x0000ffff; right ^= temp; left ^= (temp << 16);
    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);

    //for Cipher Block Chaining mode, xor the message with the previous result
    if (mode == 1) {if (encrypt) {cbcleft = left; cbcright = right;} else {left ^= cbcleft2; right ^= cbcright2;}}
    tempresult += String.fromCharCode ((left>>>24), ((left>>>16) & 0xff), ((left>>>8) & 0xff), (left & 0xff), (right>>>24), ((right>>>16) & 0xff), ((right>>>8) & 0xff), (right & 0xff));

    chunk += 8;
    if (chunk == 512) {result += tempresult; tempresult = ""; chunk = 0;}
  } //for every 8 characters, or 64 bits in the message

  //return the result as an array
  return result + tempresult;
} //end of des



//des_createKeys
//this takes as input a 64 bit key (even though only 56 bits are used)
//as an array of 2 integers, and returns 16 48 bit keys
function des_createKeys (key) {
  //declaring this locally speeds things up a bit
  pc2bytes0  = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0010204);
  pc2bytes1  = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,101);
  pc2bytes2  = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x808,0x1000000,0x1000008,0x1000800,0x1000808);
  pc2bytes3  = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10);
  pc2bytes4  = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x1041010,0x1000,0x41000,0x1010,0x41010);
  pc2bytes5  = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x102000420,0x2000000,0x2000400,0x2000020,0x2000420);
  pc2bytes6  = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,2);
  pc2bytes7  = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10800);
  pc2bytes8  = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10000,0x2040000,0x2000002,0x2040002,0x2000002,0x2040002);
  pc2bytes9  = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x1000,0x408,0x10000408,0x400,0x10000400,0x408,0x10000408);
  pc2bytes10 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x2020,0x102000,0x102020,0x102000,0x102020);
  pc2bytes11 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x1000200);
  pc2bytes12 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,10);
  pc2bytes13 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x10,0x105);

  //how many iterations (1 for des, 3 for triple des)
  var iterations = key.length >= 24 ? 3 : 1;
  //stores the return keys
  var keys = new Array (32 * iterations);
  //now define the left shifts which need to be done
  var shifts = new Array (0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
  //other variables
  var lefttemp, righttemp, m=0, n=0, temp;

  for (var j=0; j<iterations; j++) { //either 1 or 3 iterations
    left = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
    right = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);

    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);
    temp = ((right >>> -16) ^ left) & 0x0000ffff; left ^= temp; right ^= (temp << -16);
    temp = ((left >>> 2) ^ right) & 0x33333333; right ^= temp; left ^= (temp << 2);
    temp = ((right >>> -16) ^ left) & 0x0000ffff; left ^= temp; right ^= (temp << -16);
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);
    temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);

    //the right side needs to be shifted and to get the last four bits of the left side
    temp = (left << 8) | ((right >>> 20) & 0x000000f0);
    //left needs to be put upside down
    left = (right << 24) | ((right << 8) & 0xff0000) | ((right >>> 8) & 0xff00) | ((right >>> 24) & 0xf0);
    right = temp;

    //now go through and perform these shifts on the left and right keys
    for (i=0; i < shifts.length; i++) {
      //shift the keys either one or two bits to the left
      if (shifts[i]) {left = (left << 2) | (left >>> 26); right = (right << 2) | (right >>> 26);}
      else {left = (left << 1) | (left >>> 27); right = (right << 1) | (right >>> 27);}
      left &= -0xf; right &= -0xf;

      //now apply PC-2, in such a way that E is easier when encrypting or decrypting
      //this conversion will look like PC-2 except only the last 6 bits of each byte are used
      //rather than 48 consecutive bits and the order of lines will be according to 
      //how the S selection functions will be applied: S2, S4, S6, S8, S1, S3, S5, S7
      lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[(left >>> 24) & 0xf]
              | pc2bytes2[(left >>> 20) & 0xf] | pc2bytes3[(left >>> 16) & 0xf]
              | pc2bytes4[(left >>> 12) & 0xf] | pc2bytes5[(left >>> 8) & 0xf]
              | pc2bytes6[(left >>> 4) & 0xf];
      righttemp = pc2bytes7[right >>> 28] | pc2bytes8[(right >>> 24) & 0xf]
                | pc2bytes9[(right >>> 20) & 0xf] | pc2bytes10[(right >>> 16) & 0xf]
                | pc2bytes11[(right >>> 12) & 0xf] | pc2bytes12[(right >>> 8) & 0xf]
                | pc2bytes13[(right >>> 4) & 0xf];
      temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff; 
      keys[n++] = lefttemp ^ temp; keys[n++] = righttemp ^ (temp << 16);
    }
  } //for each iterations
  //return the keys we have created
  return keys;
} //end of des_createKeys


////////////////////////////// TEST //////////////////////////////
function stringToHex (s) {
  var r = "0x";
  var hexes = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
  for (var i=0; i<s.length; i++) {r += hexes [s.charCodeAt(i) >> 4] + hexes [s.charCodeAt(i) & 0xf];}
  return r;
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

var message = "";

// ~ 0.18 sec
for (var i = 0; i < 165000; i++)
  message = message + String.fromCharCode((rand() & 0x3F) + 32)

var key = "this is a 24 byte key !!";
var ciphertext = des (key, message, 1, 0);
//print(message)
//print("DES Test: " + stringToHex (ciphertext));
