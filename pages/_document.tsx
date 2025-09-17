import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Link to the manifest file */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Add theme color */}
        <meta name="theme-color" content="#092335" />
        
        {/* Favicon and other icons */}
        <link rel="icon" href="/fav.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/fav.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/fav.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/fav.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Optional: Add additional meta tags or stylesheets */}
        <meta name="description" content="Bet with Ngiribets,Number one sports Betting and Casino Platform.Sign up Today.Cheza Aviator and win 100K in seconds." />
        <meta name="keywords" content="Betika, odibets, mozzartbet,sportpesa,, aviator, bet, bet login, bet log in, today's games, game today, online betting, online sports betting, aviator login, online betting login, midweek jackpot, Join Betting, High betting odds, zero tax bet, Best betting site, Jackpot Mega" />
        <meta name="author" content="Ngiribets" />
        
        {/* Add any additional custom fonts or stylesheets */}
        {/* <link rel="stylesheet" href="/path/to/your/custom.css" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
