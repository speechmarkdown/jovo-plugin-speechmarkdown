# jovo-plugin-speechmarkdown


## Platforms
The following platforms are supported:
* [x] Amazon Alexa
* [x] Google Assistant
* [x] Samsung Bixby

## Install
Install SpeechMarkdown plugin into your Jovo project:

`npm install jovo-plugin-speechmarkdown --save`

Use the plugin in the app.js:
```javascript
const { SpeechMarkdown } = require('jovo-plugin-speechmarkdown');


app.use(
    // ... base imports
    new SpeechMarkdown()
);
```


Or app.ts:
```javascript
import { SpeechMarkdown } from 'jovo-plugin-speechmarkdown';

app.use(
    // ... base imports
    new SpeechMarkdown()
);
```

## Usage

Tell:
```javascript
this.tell('Sample [3s] speech [250ms] markdown');
```

Ask:
```javascript
this.ask('Sample [3s] speech [250ms] markdown', 'reprompt [250ms] markdown');
```

In general:
```javascript
const speechMarkdownSSML = this.$speechMarkdown.toSSML('Sample [3s] speech [250ms] markdown');
```

## Configuration

Add the plugin configuration to the project's `config.js` file:

```js
plugin: {
  SpeechMarkdown: {
    includeFormatterComment: false,
    includeParagraphTag: false,
    includeSpeakTag: true,
    preserveEmptyLines: true,
    voices: {
      Brian: { voice: { name: Joey } },
      Sarah: { voice: { name: Kendra } }
      }
  }
}
```
In this config, Alexa-specific names are used for the voices and are assigned to custom names Brian and Sarah. For Google Assistant, a mapping happens for the Alexa names to corresponding voice tags on Google.


The plugin also supports platform-specific overrides for 'amazon-alexa', 'google-assistant' and 'samsung-bixby':

```js
plugin: {
  SpeechMarkdown: {
    includeFormatterComment: false,
    includeParagraphTag: false,
    'amazon-alexa': {
      voices: {
        Brian: { voice: { name: Joey } },
        Sarah: { voice: { name: Kendra } }
      }
    },
    'google-assistant': {
      voices: {
        Brian: { voice: { gender: male, variant: 1, language: en - US } },
        Sarah: { voice: { gender: female, variant: 3, language: en - US } }
      }
    }
  }
}

```
Any root-level options are treated as defaults and any platform-specific options are merged with the defaults and overrides any properties with matching keys.