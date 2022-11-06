import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from './Providers'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
      <a
        className="audit-container large visible"
        href="https://www.certik.org/projects/treedefi"
        target="_blank"
        rel="noreferrer"
      >
        <span className="txt">Audited by</span>
        <img className="logo" src="/images/audit/certik-logo.png" alt="logo" />
        <img className="check" src="https://app.treedefi.com/audit/check-primary.svg" alt="logo" />
        <div className="mini-tag pending">COMPLETED</div>
      </a>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
