NPM module for a build pipeline that reads content from Contentful and writes it out for Contentful.

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