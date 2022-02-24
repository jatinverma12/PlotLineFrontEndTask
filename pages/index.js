import React from 'react'
import { Myeditor } from '../components/Myeditor.jsx'
import Script from 'next/script'
const task = () => {
  return (
    <>
      <div className='editor'>
        <div
          className='slate'
          style={{ width: '85%', margin: '10px 0 6rem 0' }}
        >
          <p className='interviewee-name'>John Doe Interview</p>
          <Myeditor />
        </div>

        <div className='blogs'>
          <div
            className='box'
            style={{ display: 'flex', flexDirection: 'column', padding: '5px' }}
          >
            <p style={{ margin: '0 0 0 8px', fontWeight: 'bold' }}>Box 1</p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                className='profile-pic'
                style={{
                  background: 'url(/1.png)',
                }}
              ></div>
              <div className='box-content1'>
                <span className='profile-name'>Speaker 1</span>
                <span
                  style={{ fontSize: '16px', color: '#091E42', opacity: '0.6' }}
                >
                  09:45
                </span>
              </div>
            </div>

            <div className='profile-blog'>
              There are many variations of Lorem Ipsum but the majority have
              suffered alteration There are many variationpassa don't look even
              slightly believable. If you are going to use a passage.
            </div>
          </div>
          <div
            className='box'
            style={{ display: 'flex', flexDirection: 'column', padding: '5px' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div
                className='profile-pic'
                style={{
                  background: 'url(/2.png)',
                }}
              ></div>
              <div className='box-content1'>
                <span className='profile-name'>Speaker 1</span>
                <span
                  style={{ fontSize: '16px', color: '#091E42', opacity: '0.6' }}
                >
                  09:45
                </span>
              </div>
            </div>

            <div className='profile-blog'>
              There are many variations of Lorem Ipsum but the majority have
              suffered alteration There are many variationpassa don't look even
              slightly believable. If you are going to use a passage.
            </div>
          </div>
        </div>
      </div>
      <Script
        src='https://unpkg.com/react/umd/react.production.min.js'
        strategy='beforeInteractive'
      />
      <Script
        src='https://unpkg.com/react-dom/umd/react-dom.production.min.js'
        strategy='beforeInteractive'
      />
      <Script
        src='https://unpkg.com/react-dom/umd/react-dom-server.browser.production.min.js'
        strategy='beforeInteractive'
      />
      <Script
        src='https://unpkg.com/slate/dist/slate.js'
        strategy='beforeInteractive'
      />
      <Script
        src='https://unpkg.com/slate-react/dist/slate-react.js'
        strategy='beforeInteractive'
      />
    </>
  )
}

export default task
