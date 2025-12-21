import Link from 'next/link';
import os from 'os';

export default function Home() {
  const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
    return 'N/A';
  };

  const ip = getLocalIP();

  return (
    <div className="bsod">
      <div className="home-container">
        <h1 className="neg title">
          <span className="bg">Welcome To My BSOD URL Shortener...</span>
        </h1>
        <h3 className="neg title">
          <span className="bg">IP: [{ip}]</span>
        </h3>
        <p>Use the /shorts/&lt;code&gt; path to generate a BSOD Error page to prank on your friends.</p>
        <Link href="/add" className="link">
          Press this key to continue...
        </Link>
      </div>
    </div>
  );
}