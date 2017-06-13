Super ultra-pre-alpha NPM module for a build pipeline that reads content from Contentful and writes it out for Victor Hugo. More of a proof of concept at this point, but it does work in limited cases. 

Usage:

```node index.js --space <SPACE ID> --token <ACCESS TOKEN>```

Or more optimally use environment variables:

``` 
export CONTENTFUL_SPACE=<SPACE ID>
export CONTENTFUL_TOKEN=<ACCESS TOKEN>
node index.js --space <SPACE ID> --token <ACCESS TOKEN>
```

TODO: 

* actually traverse the object graph returned from Contentful in order to intelligently handle object links
* check if files exist and skip writing if they do
* provide an actual entry point for use in a build pipeline