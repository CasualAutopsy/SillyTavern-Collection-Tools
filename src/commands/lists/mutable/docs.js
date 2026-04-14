// PUSH / POP

/**
 * Help text for list-push command with examples.
 */
export const LIST_PUSH_HELP = /*html*/`
<div>
    Pushes one or more values to the end of a list.
    <br/>If a variable is passed as a target list, then the variable will automatically be updated.
    <br/><br/>
    The <code>noParse</code> argument can be used to disable auto-casting variables.
    <br/>You can also use the <code>jsReturn</code> argument to return the new list length instead.
</div>
<div>
    <strong>Examples:</strong>
    <ul>
        <li><pre><code class="language-stscript">// You can push any value to a list |

/list-push [1,2] 3 |
// Output: [1,2,3]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// You can even push multiple values |

/list-push ["test"] 1 2 3 |
// Output: ["test",1,2,3]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// Push is a mutating method, so variables are auto-updated |

/let x [1,2,3] |
/list-push x 4 5 |

/echo {{var::x}} |
// Output: [1,2,3,4,5]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// By using the 'noParse' argument, you can push STscript values 'as-is' without casting |

/let x ["foo","bar"] |
/list-push noParse=true x 1 2 3 true |
// Output: ["foo","bar","1","2","3","true"]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// You can also use the 'jsReturn' argument to return the new list length instead. |

/let x ["foo"] |
/list-push jsReturn=true x bar |

/echo {{pipe}} |
// Output: 2</code></pre></li>
    </ul>
</div>
`;

/**
 * Help text for list-pop command with examples.
 */
export const LIST_POP_HELP = /*html*/`
<div>
    Pops a value from the end of a list.
    <br/>If a variable is passed as a target list, then the variable will automatically be updated.
    <br/><br/>
    The <code>swapReturn</code> argument can be used to swap the return value and the value stored in the variable.
</div>
<div>
    <strong>Examples:</strong>
    <ul>
        <li><pre><code class="language-stscript">// When using pop, the last value of a list is returned. |

/list-pop [1,2,3] |
// Output: 3</code></pre></li>
        <br/><li><pre><code class="language-stscript">// Pop is a mutating method, so variables are auto-updated |

/let x [1,2,3] |
/list-pop x |

/echo {{var::x}} |
// Output: [1,2]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// You can also use use 'swapReturn' to swap the return value and the mutation value |

/let x [1,2,3] |
/list-pop swapReturn=true x |

/echo {{pipe}} |
// Output: [1,2] |
/echo {{var::x}} |
// Output: 3</code></pre></li>
    </ul>
</div>
`;

/**
 * Help text for list-unshift command with examples.
 */
export const LIST_UNSHIFT_HELP = /*html*/`
<div>
    Unshifts one or more values to the beginning of a list.
    <br/>If a variable is passed as a target list, then the variable will automatically be updated.
    <br/><br/>
    The <code>noParse</code> argument can be used to disable auto-casting variables.
    <br/>You can also use the <code>jsReturn</code> argument to return the new list length instead.
</div>
<div>
    <strong>Examples:</strong>
    <ul>
        <li><pre><code class="language-stscript">// You can unshift any value to a list |

/list-unshift [1,2] 0 |
// Output: [0,1,2]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// You can even unshift multiple values |

/list-unshift ["test"] 1 2 3 |
// Output: [1,2,3,"test"]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// Unshift is a mutating method, so variables are auto-updated |

/let x [3,4,5] |
/list-unshift x 1 2 |

/echo {{var::x}} |
// Output: [1,2,3,4,5]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// By using the 'noParse' argument, you can unshift STscript values 'as-is' without casting |

/let x ["foo","bar"] |
/list-unshift noParse=true x 1 2 3 true |
// Output: ["1","2","3","true","foo","bar"]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// You can also use the 'jsReturn' argument to return the new list length instead. |

/let x ["foo"] |
/list-unshift jsReturn=true x bar |

/echo {{pipe}} |
// Output: 2</code></pre></li>
    </ul>
</div>
`;

// SHIFT / UNSHIFT

/**
 * Help text for list-shift command with examples.
 */
export const LIST_SHIFT_HELP = /*html*/`
<div>
    Shifts a value from the beginning of a list.
    <br/>If a variable is passed as a target list, then the variable will automatically be updated.
    <br/><br/>
    The <code>swapReturn</code> argument can be used to swap the return value and the value stored into the variable.
</div>
<div>
    <strong>Examples:</strong>
    <ul>
        <li><pre><code class="language-stscript">// When using shift, the first value of a list is returned. |

/list-shift [1,2,3] |
// Output: 1</code></pre></li>
        <br/><li><pre><code class="language-stscript">// Shift is a mutating method, so variables are auto-updated |

/let x [1,2,3] |
/list-shift x |

/echo {{var::x}} |
// Output: [2,3]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// You can also use use 'swapReturn' to swap the return value and the mutation value |

/let x [1,2,3] |
/list-shift swapReturn=true x |

/echo {{pipe}} |
// Output: [2,3] |
/echo {{var::x}} |
// Output: 1</code></pre></li>
    </ul>
</div>
`;

// SPLICE

/**
 * Help text for list-splice command with examples.
 */
export const LIST_SPLICE_HELP = /*html*/`
<div>
    Add, remove, or replace values from anywhere in a list.
    <br/>If a variable is passed as a target list, then the variable will automatically be updated.
    <br/><br/>
    All the arguments from pop, push, shift, and unshift are available for splice.
</div>
<div>
    <strong>Examples:</strong>
    <ul>
        <li><pre><code class="language-stscript">// With splice you can remove elements from a list and optionally replace them with new elements |

/list-splice start=4 del=1 [1,2,3,4,5] |
// Output: [1,2,3,4] |
/list-splice start=1 del=2 {{pipe}} b c |
// Output: [1,"b","c",4]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// Splice is a mutating method, so variables are auto-updated |

/let x [1,2,3] |
/list-splice start=1 del=2 x b |

/echo {{var::x}} |
// Output: [1,"b",3]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// All the arguments from push, pop, shift, and unshift work as well. |

/list-splice noParse=true start=1 del=1 [true,false] true 3 4 |
// Output: [true, "true", "3", "4"] |

/let x [1,2,3,4,5] |
/list-splice jsReturn=true start=3 del=2 x foo bar |
/echo {{pipe}} |
// Output: [4,5] |
/echo {{var::x}} |
// Output: [1,2,3,"foo","bar"]

/list-splice swapReturn=true start=1 del=1 x true |
/echo {{pipe}} |
// Output: [1,true,3,"foo","bar"] |
/echo {{var::x}} |
// Output: [2]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// To prevent the variable from being updated, use the 'immutable' argument. |

/let x [1,2,3,4,5] |
/list-splice immutable=true start=1 del=1 x true |
/echo {{pipe}} |
// Output: [1,true,3,4,5] |
/echo {{var::x}} |
// Output: [1,2,3,4,5]</code></pre></li>
    </ul>
</div>
`;

// SORT / REVERSE

/**
 * Help text for list-sort command with examples.
 */
export const LIST_SORT_HELP = /*html*/`
<div>
    Sort all the values of a list.
    <br/>If a variable is passed as a target list, then the variable will automatically be updated.
    <br/><br/>
    The argument <code>reverse</code> can be passed to apply reverse to the list after sorting.
</div>
<div>
    <strong>Examples:</strong>
    <ul>
        <li><pre><code class="language-stscript">// With sort, you can sort any list |

/list-sort [2,3,1] |
// Output: [1,2,3]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// Sort is a mutating method, so variables are auto-updated |

/let x [2,3,1] |
/list-sort x |

/echo {{var::x}} |
// Output: [1,2,3]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// You can also use the 'reverse' argument to apply reverse after sorting |

/list-sort reverse=true [2,3,1] |
// Output: [3,2,1]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// To prevent the variable from being updated, use the 'immutable' argument |

/let x [2,3,1] |
/list-sort immutable=true [2,3,1] |

/echo {{pipe}} |
// Output: [1,2,3] |
/echo {{var::x}} |
// Output: [2,3,1]</code></pre></li>
    </ul>
</div>
`;

/**
 * Help text for list-reverse command with examples.
 */
export const LIST_REVERSE_HELP = /*html*/`
<div>
    reverse all the values of a list.
    <br/>If a variable is passed as a target list, then the variable will automatically be updated.
</div>
<div>
    <strong>Examples:</strong>
    <ul>
        <li><pre><code class="language-stscript">// With reverse, you can reverse the order of any list |

/list-reverse [1,2,3] |
// Output: [3,2,1]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// Reverse is a mutating method, so variables are auto-updated |

/let x ["foo","bar"] |
/list-reverse x |

/echo {{var::x}} |
// Output: ["bar","foo"]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// To prevent the variable from being updated, use the 'immutable' argument |

/let x [1,2,3] |
/list-reverse immutable=true x |

/echo {{pipe}} |
// Output: [3,2,1] |
/echo {{var::x}} |
// Output: [1,2,3]</code></pre></li>
    </ul>
</div>
`;

// FILL / COPYWITHIN

/**
 * Help text for list-fill command with examples.
 */
export const LIST_FILL_HELP = /*html*/`
<div>
    Fill a list with a single value.
    <br/>If a variable is passed as a target list, then the variable will will automatically be updated.
</div>
<div>
    <strong>Examples:</strong>
    <ul>
        <li><pre><code class="language-stscript">// With fill, you can fill a list with a single value |

/list-fill [1,2,3] foo |
// Output: ["foo","foo","foo"]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// You can use the 'start' and 'end' arguments to specify a range |

/list-fill start=1 end=3 [1,2,3,4] foo |
// Output: [1,"foo","foo",4]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// Fill is a mutating method, so variables are auto-updated |

/let x [1,2,3,4] |
/list-fill start=1 end=3 x foo |

/echo {{var::x}} |
// Output: [1,"foo","foo",4]</code></pre></li>
    </ul>
</div>
`;

export const LIST_COPYWITHIN_HELP = /*html*/`
<div>
    Copy a section of a list to another location within the list.
    <br/>If a variable is passed as a target list, then the variable will automatically be updated.
</div>
<div>
    <strong>Examples:</strong>
    <ul>
        <li><pre><code class="language-stscript">// With copywithin, you can copy a section of a list to another location within the list |

/list-copywithin target=1 start=3 [1,2,3,4,5] |
// Output: [1,4,5,4,5]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// copywithin is a mutating method, so variables are auto-updated |

/let x [5,5,3,3] |
/list-copywithin target=0 start=2 x |

/echo {{var::x}} |
// Output: [3,3,3,3]</code></pre></li>
    </ul>
</div>
`;
