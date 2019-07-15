import {SpeechMarkdown as SMD} from 'speechmarkdown-js';

declare module 'jovo-core/dist/src/Jovo' {
    interface Jovo {
        $speechMarkdown?: SMD;
    }
}

export { SpeechMarkdown } from './SpeechMarkdown';
