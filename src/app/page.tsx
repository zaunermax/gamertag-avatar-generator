import { UserInput } from '@/components/user-input';
import { InfoSection } from '@/components/info-section';
import { Analytics } from '@vercel/analytics/react';
import { default as Image } from 'next/image';
import { NavBar } from '@/components/nav-bar';

export default async function Home() {
	return (
		<div className="relative min-h-screen bg-gray-900">
			<Image
				src={'/background-new.png'}
				alt={''}
				fill={true}
				sizes={'100vw'}
				quality={100}
				className={'object-cover brightness-50'}
				loading={'eager'}
			/>
			<div
				className={
					'absolute flex h-full w-screen flex-col items-center overflow-y-scroll'
				}
			>
				<NavBar />
				<UserInput />
				<InfoSection />
				<Analytics />
			</div>
		</div>
	);
}
