/**
 * Help text for list-push command with examples.
 */
const LIST_PUSH_HELP = `
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

/list-push noParse=true x 1 2 3 true |
// Output: ["foo","bar","1","2","3","true"]</code></pre></li>
        <br/><li><pre><code class="language-stscript">// You can also use the 'jsReturn' argument return the new list length instead. |

/let x ["foo"] |
/push-list jsReturn=true x bar |

/echo {{pipe}} |
// Output: 2</code></pre></li>
    </ul>
</div>
`;

/**
 * Help text for list-pop command with examples.
 */
const LIST_POP_HELP = `
<div>
    Pops a value from the end of a list.
    <br/>If a variable is passed as a target list, then the variable will automatically be updated.
    <br/><br/>
    The <code>swapReturn</code> argument can be used to swap the return value and the value stored in the variable.
</div>
<div>
    <strong>Examples:</strong>
    <ul>
        <li><pre><code class="language-stscript">/list-pop [1,2,3] |
// Output: 3</code></pre></li>
        <li><pre><code class="language-stscript">/let x [1,2,3] |
/list-pop x |
/echo {{var::x}} |
// Output: [1,2]</code></pre></li>
        <li><pre><code class="language-stscript">/list-pop swapReturn=true x |
/echo {{pipe}} |
// Output: [1,2]</code></pre></li>
    </ul>
</div>
`;

export const list_docs = {
    list_push: LIST_PUSH_HELP,
    list_pop: LIST_POP_HELP,
}
