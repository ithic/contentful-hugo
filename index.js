// contentful.js v4.x.x
const contentful = require('contentful')
var slugify = require('slugify')
const mkdirp = require('mkdirp')
var fs = require('fs')

const client = contentful.createClient({
  space: 't9jvaptmnytk',
  accessToken: '2a56689fbef5a84df655cf8461b0f822f7ef9fd0c9009a6256b62d0cd44b598f'
})

function writeEntriesForType(contentType) {
    client.getEntries({
        content_type: contentType.sys.id
    })
    .then((response) => {
        for (let item of response.items) {
            var fileContent = '---\n';
            for (let field of Object.keys(item.fields)) {
                if (field == 'content')
                    continue
                switch (typeof(item.fields[field])) {
                    case 'object':
                        if ('sys' in item.fields[field]) {
                            switch(item.fields[field].sys.type) {
                                case 'Asset':
                                    fileContent += `${field}: ${JSON.stringify(item.fields[field].fields.file.url)}\n`
                                    break
                                default:
                                    continue
                            }
                        } else {
                            fileContent += `${field}: ${JSON.stringify(item.fields[field])}\n`
                        }
                        break;
                    default:
                        fileContent += `${field}: ${item.fields[field]}\n`
                }
            }
            fileContent += '---\n'

            if ('content' in item.fields)
                fileContent += `${item.fields['content']}\n`

            mkdirp.sync(`./content/${contentType.sys.id}`)
            fs.writeFile(`./content/${contentType.sys.id}/${slugify(item.fields.title)}.md`, fileContent)
        }
    })
    .catch(console.error)
}

client.getContentTypes()
.then((response) => {
    for (let contentType of response.items) {
        writeEntriesForType(contentType)
    }
})
.catch(console.error)