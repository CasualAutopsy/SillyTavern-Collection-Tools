export const DICT_ASSIGN_HELP = /*html*/`
<div>
    Mutably assign properties of a dictionary to a target dictionary.
</div>
<div>
    <strong>Demonstration:</strong>
    <pre><code class="language-stscript">// With 'assign' you can assign source dictionaries to a target dictionary |
/dict-assign {"a":1} {"b":2,"c":3} |
/echo {{pipe}} |
// Output: {"a":1,"b":2,"c":3} |

// You can also use shorthand to point to variables |
// Doing so with the target dictionary will mutate the variable |
/setvar key=x {"name":"John"} |
/let y {"age":30,"gender":"male"} |

/dict-assign .x y |
/echo {{getvar::x}} |
// Output: {"name":"John","age":30,"gender":"male"}</code></pre>
</div>
`;
