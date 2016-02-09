// Feel free to use and modify this script. If you have any notes or comments
// send email to borislavm@visto.com and I will be glad to answer.
//
// 2008/08/01
// Make it available for Webkit: Zoltan Herczeg, 2008, University of Szeged
  
  /* This script uses the simpliest possible methods.
     It is just to illustrate the methodology and should
     be further optimized and 'secured' to use it as
     a part of a 'real' project!                          */

  //Adds two strings of digits
  //
  function LongAdd(Add1, Add2) {
    // If one of the operands is 0 return the other
    //
    if (!Add1||(Add1==0)||(Add1=="")) return Add2 ;
    if (!Add2||(Add2==0)||(Add2=="")) return Add1 ;

    //Find which operand is shorter and add 0s in front
    //... this will simpify the program... and make it slower
    //
    var l1 = Add1.length ;
    var l2 = Add2.length ;
    var shft = "";
    if (l1>l2) {
      for (var i=0; i<(l1-l2); i++) shft = shft + "0";
      Add2 = shft + Add2;
    } else {
      for (var i=0; i<(l2-l1); i++) shft = shft + "0";
      Add1 = shft + Add1;
    }

    //To make one-positional arithmetic
    //will need a place for the 'overflow'!
    //
    var s = 0;

    var Res = "" ;
    l1 = Add1.length;
    //
    //Browse through all positional 'couples' of the two operands
    //
    for (var i=l1; i>0; i--) {
      var a1 = Add1.charAt(i-1);
      var a2 = Add2.charAt(i-1);
      //
      //For each position add the two digits plus
      //the 'overflow'from the previous position
      //
      var Temp = parseInt(a1) + parseInt(a2) + s;
      //
      //Cut the 'overflow' from the result...
      //
      Res = (Temp % 10) + Res;
      //
      //...and save it for the next position
      //
      s = (Temp>9) ? Math.floor(Temp / 10) : 0;
    }
    //If there is 'overflow' from the most significant position,
    //left concatenate to the result
    //
    if (s!=0) Res = s + Res;
    return Res;
  }

  //Multiply a string of digits with a single digit
  //
  function SingLongMult(Mul1, digit) {
    //If multiplying by 0, return 0
    //
    if (digit=="0") return "0" ;

    //If multiplying by 1, return the operand unchanged
    //
    if (digit=="1") return Mul1 ;

    //Following variable is for the 'overflow' after
    //multiplying a position of Mul1 by digit
    //
    var s = 0;
    var Res = "";
    //The number of digits from the first operand (Mul1),
    //that should be multiplyed by the <digit> from the second operand
    //
    l = Mul1.length;
    for (var i=l; i>0; i--) {
      var m = Mul1.charAt(i-1);
      //Multiply the digit in the current position (m) and add
      //the 'overflow' from the previous position
      //
      var Temp = m * digit + s;
      //
      //Cut the 'overflow' from the result...
      //
      Res = (Temp % 10) + Res;
      //
      //...and save it for the next position
      //
      s = (Temp>9) ? Math.floor(Temp / 10) : 0;
    }
    //If there is 'overflow' from the most significant position,
    //(last operation) left concatenate it to the result
    //
    if (s!=0) Res = s + Res;
    return Res;
  } //End SingLongMult

  //Multiply two strings of digits
  //
  function LongMult(Mul1, Mul2) {
    //Shortcut if any of the operands is 0...
    //
    if (!Mul1||(Mul1=="")||(Mul1==0)) return "0" ;
    if (!Mul2||(Mul2=="")||(Mul2==0)) return "0" ;
    //... or 1
    //
    if (Mul1==1) return Mul2 ;
    if (Mul2==1) return Mul1 ;

    Result = "" ;
    l = Mul2.length;
    if (l>Mul1.length) {//Swap the operands to use the shorter one
      Res = Mul1;
      Mul1 = Mul2;
      Mul2 = Res;
    }
    l = Mul2.length;
    var shft = "";
    //
    //Will multiply the first operand (Mul1) with each digit
    //of the second operand (Mul2)
    //
    for (var j=l; j>0; j--) {
      //Prepare the string of 0s that will be right concatenated to Res
      //
      if (j<l) shft += "0" ;
      //
      //Call the function for multiplication of a single digit
      //with a string of digits
      //
      Res = SingLongMult(Mul1, Mul2.charAt(j-1)) ;
      //
      //Shift left with j 0s
      //
      if (Res>0) {
        Res = Res + shft;
        //
        //Add the current result to the previous ones
        //
        Result = LongAdd(Result, Res);
      }
    }
    return Result;
  } //End LongMult

  // Calculates factorial with simple loop
  // Note: For big numbers is really slow. IE might ask to
  //       abort the script - answer 'No'.
  //       For '500!' returns result of 1135 digits, so take it easy! ;-))
  //
  function LongFact(m) {
     var Res = "1";

     //Shortcut for 0! and 1!
     //
     if ((m==0)||(m==1)) {
       return Res;
     }

     for (var i=2; i<=m; i++)
       Res = LongMult(Res.toString(), i.toString());

     return Res;
  }

  //Uses recursion to calculate factorial
  //   Note: It is slow and easy to overflow the stack.
  //         IE might ask to abort the script - answer 'No'.
  //         For '500!' returns result of 1135 digits, so take it easy! ;-))
  //
  function LongFact2(m) {
     var Res = "1";
     if ((m==0)||(m==1)) {
       return Res;
     }
     //Subtracting 2 to reduce the stack usage, so bigger
     //operands could be used
     //
     Res = LongMult(LongFact2(m-2).toString(), (m-1).toString());
     Res = LongMult(Res.toString(), m.toString());

     return Res;
  }

// = 480!
LongFact("480")
