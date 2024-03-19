import React from 'react'

const AppFooter = () => {
  return (
    <footer className="footer">
      <div className="mx-3">
        <a href="/" target="_blank" rel="noopener noreferrer">
          {' '}
        </a>
        <span className="ms-1"> Copyright © 2022 Ensurekar.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Devloped & Designed by Redspark</span>
      </div>
    </footer>
  )
}

export default React.memo(AppFooter)
