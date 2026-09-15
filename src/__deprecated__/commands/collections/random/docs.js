export const COLLECTION_SAMPLE_HELP = /*html*/`
<div>
    Randomly samples a value from a collection.
</div>
<div>
    <strong>Demonstrations:</strong>
    <pre><code class="language-stscript">// By giving a collection, you can randomly sample a value contained within |
/collection-sample [1,2,3] |
// Possible Output: 2 |

// Use shorthand to retrieve a variable collection. |
/let x ["a","b","c"] |
/setvar key=y [{"key1": 123}, {"key2": 456}] |
/setglobalvar key=z [true, false] |

/collection-sample x |
// Possible Output: c |

/collection-sample .y |
// Possible Output: {"key2": 456} |

/collection-sample $z |
// Possible Output: true</code></pre>
</div>
`;

export const COLLECTION_SAMPLE_SIZE_HELP = /*html*/`
<div>
    Randomly sample n values from a collection.
</div>
<div>
    <strong>Demonstrations:</strong>
    <pre><code class="language-stscript">// By giving both a collection and a integer, you can randomly sample n values from the collection |
/collection-sample-size [1,2,3] 2 |
// Possible Output: [2,3] |

// For shorthand usage read '/collection-sample'</code></pre>
</div>
`;

export const COLLECTION_SHUFFLE_HELP = /*html*/`
<div>
    Randomly shuffles the values of a collection.
</div>
<div>
    <strong>Demonstrations:</strong>
    <pre><code class="language-stscript">// Shuffle will randomize value placement of any collection given to the command |
/collection-shuffle [1,2,3] |
// Possible Output: [2,3,1] |

// Use shorthand to retrieve a variable collevtion. |
/let x [1,2,3] |
/setvar key=y ["a","b","c"] |
/setglobalvar key=z ["d","e","f"] |

/collection-shuffle x |
// Possible Output: [2,1,3] |

/collection-shuffle .y |
// Possible Output: ["b","c","a"] |

/collection-shuffle $z |
// Possible Output: ["f","e","d"]</code></pre>
</div>
`;
