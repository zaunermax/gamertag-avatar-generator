import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'tagVAtar',
	description: 'Generate your own avatar with OpenAI and your gamertag',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
