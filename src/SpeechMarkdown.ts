import { BaseApp, HandleRequest, Jovo, Plugin, PluginConfig } from 'jovo-core';
import _merge = require('lodash.merge');
import { SpeechMarkdown as SMD } from 'speechmarkdown-js';
import { SpeechOptions } from 'speechmarkdown-js/dist/src/SpeechOptions' // tslint:disable-line

export interface PlatformOverrideSpeechOptions extends SpeechOptions {
    'amazon-alexa'?: SpeechOptions;
    'google-assistant'?: SpeechOptions;
    'samsung-bixby'?: SpeechOptions;
}

export interface Config extends PluginConfig {
    options: PlatformOverrideSpeechOptions;
}

export class SpeechMarkdown implements Plugin {
    static getPlatform(jovo: Jovo) {
        let platform;

        switch (jovo.getType()) {
            case 'AlexaSkill':
                platform = 'amazon-alexa';
                break;
            case 'GoogleAction':
                platform = 'google-assistant';
                break;
            case 'BixbyCapsule':
                platform = 'samsung-bixby';
                break;
            default: platform = '';
        }

        return platform;
    }

    config: Config = {
        options: {
            includeFormatterComment: false,
            includeParagraphTag: false,
            includeSpeakTag: true,
            platform: '',
            preserveEmptyLines: true,
            voices: {},
        },
    };

    constructor(config?: Config) {
        if (config) {
            this.config = _merge(this.config, config)
        }
    }

    install(app: BaseApp) {

        Jovo.prototype.$speechMarkdown = undefined;

        // initialize SpeechMarkdown instance
        app.middleware('after.platform.init')!.use((handleRequest: HandleRequest) => {
            const platform = SpeechMarkdown.getPlatform(handleRequest.jovo!);

            let options = {
                ...this.config.options,
                platform
            };

            if (options['amazon-alexa']) {
                options = _merge(options, options['amazon-alexa'])
                delete options['amazon-alexa'];
            } else if (options['google-assistant']) {
                options = _merge(options, options['google-assistant'])
                delete options['google-assistant'];
            } else if (options['samsung-bixby']) {
                options = _merge(options, options['samsung-bixby'])
                delete options['samsung-bixby'];
            }

            handleRequest.jovo!.$speechMarkdown = new SMD(options);
        });

        app.on('before.platform.output', (handleRequest: HandleRequest) => {
            if (handleRequest.jovo!.$speechMarkdown) {
                if (handleRequest.jovo!.$output.tell) {
                    handleRequest.jovo!.$output.tell.speech = handleRequest.jovo!.$speechMarkdown.toSSML(handleRequest.jovo!.$output.tell.speech.toString());

                    // tmp?
                    handleRequest.jovo!.$output.tell.speech = handleRequest.jovo!.$output.tell.speech.replace(/\n/g, '');
                }

                if (handleRequest.jovo!.$output.ask) {
                    handleRequest.jovo!.$output.ask.speech = handleRequest.jovo!.$speechMarkdown.toSSML(handleRequest.jovo!.$output.ask.speech.toString());
                    handleRequest.jovo!.$output.ask.reprompt = handleRequest.jovo!.$speechMarkdown.toSSML(handleRequest.jovo!.$output.ask.reprompt.toString());

                    // tmp?
                    handleRequest.jovo!.$output.ask.speech = handleRequest.jovo!.$output.ask.speech.replace(/\n/g, '');
                    handleRequest.jovo!.$output.ask.reprompt = handleRequest.jovo!.$output.ask.reprompt.replace(/\n/g, '');

                }
            }
        });
    }

}
