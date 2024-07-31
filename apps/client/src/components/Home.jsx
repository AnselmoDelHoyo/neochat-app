// import React from 'react'
import './Home.css'

export default function Home() {
    return (
        <main id='home'>
          <p>This is neochat, a web chat application with a epic design.</p>
          <h1 className='home__title'>Neochat</h1>
          <section className='home__buttons'>
            <button>Sign In</button>
            <button>Sign Up</button>
          </section>
        </main>
    )
}
