import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'TradeAI',
  description: 'Project foundation for TradeAI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
