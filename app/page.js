import Link from 'next/link';

export default function Home() {
  return (
      <div className="bsod">
        <div className="home-container">
          <h1 className="neg title"><span className="bg">Welcome To My BSOD URL Shortener...</span></h1>
          <p>Use the /shorts/&lt;code&gt; path to generate a BSOD Error page to prank on your friends.</p>
          <Link href="/add" className="link">
            Press this key to continue...
          </Link>
        </div>
      </div>
  );
}