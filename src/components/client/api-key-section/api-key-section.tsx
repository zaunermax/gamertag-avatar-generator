import clsx from 'clsx';
import { Accordion, Alert, Button, Label, TextInput } from 'flowbite-react';
import { SetStateAction, WritableAtom, useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useCallback, useId } from 'react';
import { HiInformationCircle } from 'react-icons/hi';

import { settingsAtom, SettingsType } from '@/atoms/settings.atom';
import { LoadingSpinner } from '@/components/client/loading-spinner-text';
import { useApiKeyValid } from '@/hooks/use-openai-api-key-valid';
import { BooleanOrNullKeys, StringKeys } from '@/types';

type ApiKeySectionProps = {
	keyAtom: WritableAtom<string, [SetStateAction<string>], void>;
	validAtom: WritableAtom<null, [boolean | null], void>;
	checkApiKey: (key: string) => Promise<boolean>;
	apiKeySettingsKey: StringKeys<SettingsType>;
	isValidSettingsKey: BooleanOrNullKeys<SettingsType>;
	goTo: string;
	backToText: string;
	helpTitle: string;
	children: ReactNode;
	className?: string;
};

// TODO: still not happy with this solution
// maybe we can use jotai optics to improve this
export const ApiKeySection = ({
	keyAtom,
	validAtom,
	checkApiKey,
	apiKeySettingsKey,
	isValidSettingsKey,
	goTo,
	backToText,
	helpTitle,
	children,
	className,
}: ApiKeySectionProps) => {
	const keyElementId = useId();
	const router = useRouter();

	const [{ [apiKeySettingsKey]: keyVal, [isValidSettingsKey]: isValid }, setSettings] =
		useAtom(settingsAtom);

	const [openaiPending] = useApiKeyValid({
		keyAtom,
		validAtom,
		checkApiKey,
	});

	const onChangeKey = useCallback(
		(e: FormEvent<HTMLInputElement>) =>
			setSettings((prev) => ({ ...prev, [apiKeySettingsKey]: e.currentTarget.value })),
		[apiKeySettingsKey, setSettings],
	);

	const onGoTo = useCallback(() => router.push(goTo), [goTo, router]);

	return (
		<div className={clsx('space-y-4', className)}>
			<div>
				<div className="mb-2 block">
					<Label htmlFor={keyElementId} value="Your openAI API key" />
				</div>
				<TextInput
					id={keyElementId}
					type="password"
					placeholder="OpenAI API Key"
					className="w-full"
					value={keyVal}
					onChange={onChangeKey}
				/>
			</div>
			{isValid === false && !openaiPending && (
				<Alert color="warning" icon={HiInformationCircle}>
					Your key does not seem to be valid.
				</Alert>
			)}
			<Accordion collapseAll>
				<Accordion.Panel flush={false}>
					<Accordion.Title>{helpTitle}</Accordion.Title>
					<Accordion.Content>{children}</Accordion.Content>
				</Accordion.Panel>
			</Accordion>
			<Button
				className="w-full"
				gradientDuoTone="purpleToPink"
				disabled={!isValid || openaiPending}
				onClick={onGoTo}
			>
				{openaiPending ? (
					<LoadingSpinner text={'Checking key...'} />
				) : isValid ? (
					backToText
				) : (
					'Enter a valid API key first'
				)}
			</Button>
		</div>
	);
};