import { useEffect , useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import styles from '../styles/Home.module.css'

export default function Home() {
  //set up the typing for beer
  type Beer = {
    id: number
    name: string
    description: string
    image_url: string
  }
  
  //set up the state for the beer
  const [beer, setBeer] = useState<Beer | null>(null)
  


   async function getRandomBeer() {
    const res = await fetch('https://api.punkapi.com/v2/beers/random')
    const data = await res.json()
    console.log(data[0])
    setBeer(data[0])
    return data[0]
  }

  useEffect(() => {
    getRandomBeer().then(beer => {
      console.log(beer)
      setBeer(beer)
    })
  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>Random Beer Machine</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src='https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js' />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Random Beer Machine! <br/>
          A Front End for the <a href="https://punkapi.com">Punk API!</a>
        </h1>
        <h3><a href="https://twitter.com/intent/tweet" id="tweet-quote">Tweet This Beer!</a></h3>

        <p className={styles.description}>
          This Front End was built with Next.js and Tailwind CSS, and will display a random beer from the Punk API.
        </p>

        <div className={styles.grid} id="quote-box">
          <a href="#" className={styles.card} onClick={getRandomBeer}>
            <h2>{beer?.name}</h2>
            <p id="text">{beer?.description}</p>

          </a>
          <button href="#" id="#new-quote"  onClick={getRandomBeer}>
            {beer?.image_url && <Image id="author" src={beer.image_url} alt={beer.name} width={200} height={500} /> || <p>Click to get a random beer!</p>}
          </button>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}


