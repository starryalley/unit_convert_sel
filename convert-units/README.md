convert-units
=============

This is a local copy of [convert-units](https://github.com/ben-ng/convert-units) by Ben Ng. Some modifications are done for this project. 

See [https://github.com/ben-ng/convert-units](https://github.com/ben-ng/convert-units) for details.


## Modifications

- remove 'require' which isn't available in chrome env, and use variables instead
- for lodash key/each function, use lodash custom build min js instead
- all js files are listed in manifest.json in specific order so the content script can use this library
