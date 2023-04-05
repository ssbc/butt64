# is-canonical-butt64

Based on [is-canonical-base64] but modified to generate regular
expressions for url-safe base64, as described in [ssb-uri spec] :

> URI-safe Base64 is equivalent to Base64 where + characters are replaced with -, and / characters are replaced with _.


## Example Usage

```
const isCanonicalButt64 = require('is-canonical-butt64')

const regex = isCanonicalButt64('ssb:feed/classic/, null, 32)

regest.test('ssb:feed/classic/-oaWWDs8g73EZFUMfW37R_ULtFEjwKN_DczvdYihjbU=')
// => true
```



## API

### isCanonicalButt64(prefix, suffix, length) => RegExp

All arguments are optional
- `prefix` *String* or *Pattern* to require at the beginning of string
- `suffix` *String* or *Pattern* pattern to require at the end of string
- `length` *Integer* the length of the data in bytes you're expected to be encoded

### isCanonicalButt64.bufferToButt64(buffer) => string

Converts a buffer ing a base64 encoded string.

alias: `toString`

### isCanonicalButt64.butt64ToBuffer(string) => buffer

Converts a butt64 encoded string into a buffer.

alias: `toBuffer`

## License

MIT


[is-canonical-base64]: https://github.com/dominictarr/is-canonical-base64
[ssb-uri spec]: https://github.com/ssbc/sips/blob/master/001.md
