/*
http://www.kevlindev.com/utilities/index.htm

Copyright (c) 2000-2004, Kevin Lindsey
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

    - Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.

    - Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

    - Neither the name of this software nor the names of its contributors
      may be used to endorse or promote products derived from this software
      without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


2008/08/01
Make it available for Webkit: Zoltan Herczeg, 2008, University of Szeged
*/

/*****
*
*   RedBlackNode.js
*
*   copyright 2004, Kevin Lindsey
*   licensing info available at: http://www.kevlindev.com/license.txt
*
*****/

/*****
*
*   class variables
*
*****/
RedBlackNode.VERSION = 1.0;


/*****
*
*   constructor
*
*****/
function RedBlackNode(value) {
    this._left   = null;
    this._right  = null;
    this._value  = value;
    this._height = 1;
}


/*****
*
*   add
*
*****/
RedBlackNode.prototype.add = function(value) {
    var relation = value["compare"](this._value);
    var addResult;
    var result;
    var newNode;

    if ( relation != 0 ) {
        if ( relation < 0 ) {
            if ( this._left != null ) {
                addResult = this._left.add(value);
                this._left = addResult[0];
                newNode = addResult[1];
            } else {
                newNode = this._left = new RedBlackNode(value);
            }
        } else if ( relation > 0 ) {
            if ( this._right != null ) {
                addResult = this._right.add(value);
                this._right = addResult[0];
                newNode = addResult[1];
            } else {
                newNode = this._right = new RedBlackNode(value);
            }
        }
        result = [this.balanceTree(), newNode];
    } else {
        result = [this, this];
    }

    return result;
};


/*****
*
*   balanceTree
*
*****/
RedBlackNode.prototype.balanceTree = function() {
    var leftHeight  = (this._left  != null) ? this._left._height  : 0;
    var rightHeight = (this._right != null) ? this._right._height : 0;
    var result;

    if ( leftHeight > rightHeight + 1 ) {
        result = this.swingRight();
    } else if ( rightHeight > leftHeight + 1 ) {
        result = this.swingLeft();
    } else {
        this.setHeight();
        result = this;
    }

    return result;
};


/*****
*
*   join
*
*****/
RedBlackNode.prototype.join = function(that) {
    var result;

    if ( that == null ) {
        result = this;
    } else {
        var top;

        if ( this._height > that._height ) {
            top = this;
            top._right = that.join(top._right);
        } else {
            top = that;
            top._left = this.join(top._left);
        }

        result = top.balanceTree();
    }

    return result;
};


/*****
*
*   moveLeft
*
*****/
RedBlackNode.prototype.moveLeft = function() {
    var right = this._right;
    var rightLeft = right._left;
    
    this._right = rightLeft;
    right._left = this;
    this.setHeight();
    right.setHeight();

    return right;
};


/*****
*
*   moveRight
*
*****/
RedBlackNode.prototype.moveRight = function() {
    var left = this._left;
    var leftRight = left._right;
    
    this._left = leftRight;
    left._right = this;
    this.setHeight();
    left.setHeight();

    return left;
};


/*****
*
*   remove
*
*****/
RedBlackNode.prototype.remove = function(value) {
    var relation = value["compare"](this._value);
    var remResult;
    var result;
    var remNode;

    if ( relation != 0 ) {
        if ( relation < 0 ) {
            if ( this._left != null ) {
                remResult = this._left.remove(value);
                this._left = remResult[0];
                remNode = remResult[1];
            } else {
                remNode = null;
            }
        } else {
            if ( this._right != null ) {
                remResult = this._right.remove(value);
                this._right = remResult[0];
                remNode = remResult[1];
            } else {
                remNode = null;
            }
        }

        result = this;
    } else {
        remNode = this;

        if ( this._left == null ) {
            result = this._right;
        } else if ( this._right == null ) {
            result = this._left;
        } else {
            result = this._left.join(this._right);
            this._left = null;
            this._right = null;
        }
    }

    if ( remNode != null ) {
        if ( result != null ) {
            return [result.balanceTree(), remNode];
        } else {
            return [result, remNode];
        }
    } else {
        return [this, null];
    }
};


/*****
*
*   setHeight
*
*****/
RedBlackNode.prototype.setHeight = function() {
    var leftHeight  = (this._left  != null) ? this._left._height  : 0;
    var rightHeight = (this._right != null) ? this._right._height : 0;
    
    this._height = (leftHeight < rightHeight) ? rightHeight + 1 : leftHeight + 1;
};


/*****
*
*   swingLeft
*
*****/
RedBlackNode.prototype.swingLeft = function() {
    var right      = this._right;
    var rightLeft  = right._left;
    var rightRight = right._right;
    var left       = this._left;

    var leftHeight       = (left       != null ) ? left._height       : 0;
    var rightLeftHeight  = (rightLeft  != null ) ? rightLeft._height  : 0;
    var rightRightHeight = (rightRight != null ) ? rightRight._height : 0;

    if ( rightLeftHeight > rightRightHeight ) {
        this._right = right.moveRight();
    }

    return this.moveLeft();
};


/*****
*
*   swingRight
*
*****/
RedBlackNode.prototype.swingRight = function() {
    var left      = this._left;
    var leftRight = left._right;
    var leftLeft  = left._left;
    var right     = this._right;

    var rightHeight     = (right     != null ) ? right._height     : 0;
    var leftRightHeight = (leftRight != null ) ? leftRight._height : 0;
    var leftLeftHeight  = (leftLeft  != null ) ? leftLeft._height  : 0;

    if ( leftRightHeight > leftLeftHeight ) {
        this._left = left.moveLeft();
    }

    return this.moveRight();
};


/*****
*
*   traverse
*
*****/
RedBlackNode.prototype.traverse = function(func) {
    if ( this._left  != null ) this._left.traverse(func);
    func(this);
    if ( this._right != null ) this._right.traverse(func);
};


/*****
*
*   toString
*
*****/
RedBlackNode.prototype.toString = function() {
    return this._value.toString();
};

/*****
*
*   RedBlackTree.js
*
*   copyright 2004, Kevin Lindsey
*   licensing info available at: http://www.kevlindev.com/license.txt
*
*****/

/*****
*
*   class variables
*
*****/
RedBlackTree.VERSION = 1.0;


/*****
*
*   constructor
*
*****/
function RedBlackTree() {
    this._root      = null;
    this._cursor    = null;
    this._ancestors = [];
}


/*****  private methods *****/

/*****
*
*   _findNode
*
*****/
RedBlackTree.prototype._findNode = function(value, saveAncestors) {
    if ( saveAncestors == null ) saveAncestors = false;

    var result = this._root;

    if ( saveAncestors ) {
        this._ancestors = [];
    }
    
    while ( result != null ) {
        var relation = value["compare"](result._value);

        if ( relation != 0 ) {
            if ( saveAncestors ) {
                this._ancestors.push(result);
            }
            if ( relation < 0 ) {
                result = result._left;
            } else {
                result = result._right;
            }
        } else {
            break;
        }
    }

    return result;
};


/*****
*
*   _maxNode
*
*****/
RedBlackTree.prototype._maxNode = function(node, saveAncestors) {
    if ( node == null ) node = this._root;
    if ( saveAncestors == null ) saveAncestors = false;

    if ( node != null ) {
        while ( node._right != null ) {
            if ( saveAncestors ) {
                this._ancestors.push(node);
            }
            node = node._right;
        }
    }

    return node;
};


/*****
*
*   _minNode
*
*****/
RedBlackTree.prototype._minNode = function(node, saveAncestors) {
    if ( node == null ) node = this._root;
    if ( saveAncestors == null ) saveAncestors = false;

    if ( node != null ) {
        while ( node._left != null ) {
            if ( saveAncestors ) {
                this._ancestors.push(node);
            }
            node = node._left;
        }
    }

    return node;
};


/*****
*
*   _nextNode
*
*****/
RedBlackTree.prototype._nextNode = function(node) {
    if ( node != null ) {
        if ( node._right != null ) {
            this._ancestors.push(node);
            node = this._minNode(node._right, true);
        } else {
            var ancestors = this._ancestors;
            parent = ancestors.pop();
            
            while ( parent != null && parent._right === node ) {
                node = parent;
                parent = ancestors.pop();
            }

            node = parent;
        }
    } else {
        this._ancestors = [];
        node = this._minNode(this._root, true);
    }

    return node;
};


/*****
*
*   _previousNode
*
*****/
RedBlackTree.prototype._previousNode = function(node) {
    if ( node != null ) {
        if ( node._left != null ) {
            this._ancestors.push(node);
            node = this._maxNode(node._left, true);
        } else {
            var ancestors = this._ancestors;
            parent = ancestors.pop();
            
            while ( parent != null && parent._left === node ) {
                node = parent;
                parent = ancestors.pop();
            }

            node = parent;
        }
    } else {
        this._ancestors = [];
        node = this._maxNode(this._root, true);
    }

    return node;
};


/*****  public methods  *****/

/*****
*
*   add
*
*****/
RedBlackTree.prototype.add = function(value) {
    var result;
    
    if ( this._root == null ) {
        result = this._root = new RedBlackNode(value);
    } else {
        var addResult = this._root.add(value);

        this._root = addResult[0];
        result = addResult[1];
    }

    return result;
};


/*****
*
*   find
*
*****/
RedBlackTree.prototype.find = function(value) {
    var node = this._findNode(value);
    
    return ( node != null ) ? node._value : null;
};


/*****
*
*   findNext
*
*****/
RedBlackTree.prototype.findNext = function(value) {
    var current = this._findNode(value, true);

    current = this._nextNode(current);

    return (current != null ) ? current._value : null;
};


/*****
*
*   findPrevious
*
*****/
RedBlackTree.prototype.findPrevious = function(value) {
    var current = this._findNode(value, true);

    current = this._previousNode(current);

    return (current != null ) ? current._value : null;
};


/*****
*
*   max
*
*****/
RedBlackTree.prototype.max = function() {
    var result = this._maxNode();

    return ( result != null ) ? result._value : null;
};


/*****
*
*   min
*
*****/
RedBlackTree.prototype.min = function() {
    var result = this._minNode();

    return ( result != null ) ? result._value : null;
};


/*****
*
*   next
*
*****/
RedBlackTree.prototype.next = function() {
    this._cursor = this._nextNode(this._cursor);

    return ( this._cursor ) ? this._cursor._value : null;
};


/*****
*
*   previous
*
*****/
RedBlackTree.prototype.previous = function() {
    this._cursor = this._previousNode(this._cursor);

    return ( this._cursor ) ? this._cursor._value : null;
};


/*****
*
*   remove
*
*****/
RedBlackTree.prototype.remove = function(value) {
    var result;

    if ( this._root != null ) {
        var remResult = this._root.remove(value);

        this._root = remResult[0];
        result = remResult[1];
    } else {
        result = null;
    }

    return result;
};


/*****
*
*   traverse
*
*****/
RedBlackTree.prototype.traverse = function(func) {
    if ( this._root != null ) {
        this._root.traverse(func);
    }
};


/*****
*
*   toString
*
*****/
RedBlackTree.prototype.toString = function() {
    var lines = [];

    if ( this._root != null ) {
        var indentText = "  ";
        var stack = [[this._root, 0, "^"]];

        while ( stack.length > 0 ) {
            var current = stack.pop();
            var node    = current[0];
            var indent  = current[1];
            var line    = "";

            for ( var i = 0; i < indent; i++ ) {
                line += indentText;
            }
            
            line += current[2] + "(" + node.toString() + ")";
            lines.push(line);

            if ( node._right != null ) stack.push([node._right, indent+1, "R"]);
            if ( node._left  != null ) stack.push([node._left,  indent+1, "L"]);
        }
    }
    
    return lines.join("\n");
};

/*****
 *
 *   add compare method to all numbers
 *
 *****/
Number.prototype.compare = function(that) {
    return this - that;
}

function Obj(val) {
    this.val = val
    this["val"]++
    this.compare = function(that) {
        if ((that instanceof Obj) && typeof(that.val) == "number") {
	    with (that)
                return this.val - val;
	} else
	    throw "Cannot compare!"
    }
}

// From Breath of Fire II
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

tree = new RedBlackTree();

for ( var i = 0; i < 23000; i++ ) {
  // ~ 0.048 sec
  var value = new Obj(rand());
  if (tree.find(value) instanceof Obj) {
    tree.remove(value);
    //print("REMOVE:", value.val)
  } else {
    tree.add(value);
    //print("ADD:", value.val)
  }
}

//print(tree.toString())
