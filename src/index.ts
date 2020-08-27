import {SpeechMarkdown as SMD} from 'speechmarkdown-js';

declare module 'jovo-core/dist/src/core/Jovo' {
    interface Jovo {
        $speechMarkdown?: SMD;
    }
}

export { SpeechMarkdown } from './SpeechMarkdown';
