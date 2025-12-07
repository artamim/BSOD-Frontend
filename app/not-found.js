// app/not-found.js
export default function NotFound() {
  return (
    <div className="bsod container">
      <h1 className="neg title"><span className="bg">Error - 404</span></h1>
      <p>An error has occured, to continue:</p>
      <p>
        * Return to my <a href="/" className="link" style={{ textDecoration: 'underline' }}>homepage</a>.<br />
        * Feel free to contact me at <a href="https://linkedin.com/in/arifur-rahman-tamim-712494254" className="link" style={{ textDecoration: 'underline' }}>LinkedIn</a>.
      </p>
    </div>
  );
}