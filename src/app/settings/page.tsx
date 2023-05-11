'use client';

import {
	openaiApiKeyAtom,
	sdApiKeyAtom,
	writeOpenaiApiKeyValidAtom,
	writeSdApiKeyValidAtom,
} from '@/atoms/settings.atom';
import {
	OpenaiHelpSection,
	SdHelpSection,
	ApiKeySection,
} from '@/components/client/api-key-section';
import { InfoSection } from '@/components/client/info-section';
import { Container } from '@/components/server/container';
import { checkOpenaiApiKey } from '@/server-actions/check-openai-key';
import { checkSdApiKey } from '@/server-actions/sd-image-actions';

export default function Settings() {
	return (
		<>
			<InfoSection />
			<Container className="space-y-6">
				<h1 className="text-center text-2xl font-bold leading-tight text-white md:text-3xl">
					Settings
				</h1>
				<ApiKeySection
					keyAtom={openaiApiKeyAtom}
					validAtom={writeOpenaiApiKeyValidAtom}
					checkApiKey={checkOpenaiApiKey}
					apiKeySettingsKey={'openaiApiKey'}
					isValidSettingsKey={'openaiApiKeyValid'}
					goTo={'/dalle'}
					backToText={'Back to DALL-E'}
					helpTitle={'How to get an OpenAI API key?'}
				>
					<OpenaiHelpSection />
				</ApiKeySection>
				<ApiKeySection
					keyAtom={sdApiKeyAtom}
					validAtom={writeSdApiKeyValidAtom}
					checkApiKey={checkSdApiKey}
					apiKeySettingsKey={'dreamStudioApiKey'}
					isValidSettingsKey={'dreamStudioApiKeyValid'}
					goTo={'/sd'}
					backToText={'Back to StableDiffusion'}
					helpTitle={'How to get a DreamStudio API key?'}
				>
					<SdHelpSection />
				</ApiKeySection>
			</Container>
		</>
	);
}
