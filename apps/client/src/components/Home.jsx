// import React from 'react'
import { useNavigate } from 'react-router'
import '../styles/Home.css'

export default function Home() {

    const navigate = useNavigate()

    const toLogin =()=> navigate('login')

    return (
        <main id='home'>
          <div className='home__text'>
            <p>This is neochat, a web chat application with a epic design.</p>
          </div>
          <h1 className='home__title'><span className='title__branch'>Neo</span>chat</h1>
          <section className='home__buttons'>
            <button onClick={toLogin}>Sign In</button>
            <button>Sign Up</button>
          </section>
        </main>
    )
}
