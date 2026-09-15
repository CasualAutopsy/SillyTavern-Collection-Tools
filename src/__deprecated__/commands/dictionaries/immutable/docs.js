export const DICT_AT_HELP = /*html*/`
<div>
    Retrieve multiple values at specified paths from a dictionary.
</div>
<div>
    <strong>Demonstration:</strong>
    <pre><code class="language-stscript">// With 'at' you can retrieve multiple values from a dictionary and put them in a list |

/dict-at {"key": [1,2,3]} "key[0]" "key[1]" |
// Output: [1, 2] |

// You can also use shorthand to retrieve var values |

/setvar key=x {"a": [{"b": {"c": 3}}, 4]} |

/dict-at .x "a[0].b.c" "a[1]" |
// Output: [3, 4]</code></pre>
</div>
`;

export const DICT_GET_HELP = /*html*/`
<div>
    Retrieve a single value at a specified path from a dictionary.
</div>
<div>
    <strong>Demonstration:</strong>
    <pre><code class="language-stscript">// With 'get' you can retrieve a single value from a dictionary |

/dict-get {"key": [1,2,3]} "key[1]" |
// Output: 2 |

// You can set a default value for when no value exists within the given path |
/dict-get default=false {"key": [1,2,3]} "key[3]" |
// Output: false |

// You can also use shorthand to retrieve var values |
/setvar key=x {"key": [1,2,3]} |
/setglobalvar key=y false |

/dict-get default=y .x "key[1]" |
// Output: 2</code></pre>
</div>
`;
