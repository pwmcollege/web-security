Same idea as last time, only the quotes changed. Your input now sits inside a template literal, the backtick kind, in that same nonce-guarded script block.

A plain double quote won't close a backtick string, so the trick from last level just bounces off. But backticks come with a feature ordinary strings don't have: they run little expressions dropped right into the middle of the text, as JavaScript, exactly where they sit. The nonce still blocks new script tags, so forget escaping to HTML.
