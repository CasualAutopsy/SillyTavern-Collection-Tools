export const LIST_ZIP_HELP = /*html*/`
<div>
    Zips two or more list together into a list of tuples.
</div>
<div>
    <strong>Demonstration:</strong>
    <pre><code class="language-stscript">// The list-zip command allows you to take any amount of lists of the same length and zip them into a tuple |
/list-zip [1,2,3] ["a","b","c"] |
/echo {{pipe}} |
// Output: [[1,"a"],[2,"b"],[3,"c"]] |

// Use shorthand to retrieve variable values |
/let x [1,2,3] |
/setvar key=y ["a","b","c"] |
/setglobalvar key=z [true,false,true] |

/list-zip x .y $z |
/echo {{pipe}} |
// Output: [[1,"a",true],[2,"b",false],[3,"c",true]]</code></pre>
</div>
`;

export const LIST_ZIP_OBJECT_HELP = /*html*/`
<div>
    Zip two lists together into an object. The first list is the keys, the second list is the values.
</div>
<div>
    <strong>Demonstration:</strong>
    <pre><code class="language-stscript">// The list-zip-object command allows you to take two lists and zip them into an object |
/list-zip-object ["a","b","c"] [1,2,3] |
/echo {{pipe}} |
// Output: {"a":1,"b":2,"c":3} |

// Use shorthand to retrieve variable values |
/setglobalvar key=x ["a","b","c"] |
/setvar key=y [1,2,3] |

/list-zip-object $x .y |
/echo {{pipe}} |
// Output: {"a":1,"b":2,"c":3}</code></pre>
</div>
`;
