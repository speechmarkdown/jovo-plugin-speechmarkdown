# jovo-plugin-speechmarkdown
Jovo Plugin for Speech Markdown


Install SpeechMarkdown plugin into your Jovo project:
`npm install jovo-plugin-speechmarkdown --save`

Use the plugin in the app.js:
```javascript 
const { SpeechMarkdown } = require('jovo-plugin-speechmarkdown');
...

app.use(new SpeechMarkdown());
```


Or app.ts:
```javascript 
import { SpeechMarkdown } from 'jovo-plugin-speechmarkdown';
...

app.use(new SpeechMarkdown());
```

## Usage

Tell:
```javascript        
this.tell('Sample [3s] speech [250ms] markdown');
```

Ask:
```javascript        
this.tell('Sample [3s] speech [250ms] markdown', 'reprompt [250ms] markdown');
```

In general:
```javascript
const speechMarkdownSSML = this.$speechMarkdown.toSSML('Sample [3s] speech [250ms] markdown', 'reprompt [250ms] markdown');
```
