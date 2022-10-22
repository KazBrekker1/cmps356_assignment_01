import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Pairs from '../components/Pairs'

export default function Home({ final_results }) {
  // check if there is a selected base in the local storage
  const [selected_base, setSelectedBase] = useState("USD")
  let selected_base_object = final_results.filter((result) => result.key === selected_base)[0]
  // on page load, check if there is a selected base in the local storage
  useEffect(() => {
    if (localStorage.getItem("selected_base")) {
      setSelectedBase(localStorage.getItem("selected_base"))
    }
  }, [])

  useEffect(() => {
    // save selected base to local storage
    localStorage.setItem('selected_base', selected_base)
    selected_base_object = final_results.filter((result) => result.key === selected_base)[0]
  }, [selected_base])
  return (
    <>
      <Head>
        <title>Assignment 1</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="min-w-full flex flex-col gap-10 p-5">
        <h1 className="text-4xl font-bold font-mono text-center">Exchange Rates.</h1>
        <select className="shadow-md rounded-md p-4 text-center text-xl bg-neutral text-neutral-content sticky top-10 z-10 w-4/5 mx-auto"
          onChange={(e) => setSelectedBase(e.target.value)}
        >
          {
            final_results.map((result) => (
              <option key={result.key}>{result.key}</option>
            ))
          }
        </select>

        <Pairs
          key={selected_base_object.key}
          base_name={selected_base_object.key}
          rates={selected_base_object.data.rates}
        />
      </div>
    </>
  )
}

export async function getStaticProps() {
  let symbolsUrl = 'https://api.exchangerate.host/symbols'
  let final_results = []
  let symbols = []
  let symbols_res = await fetch(symbolsUrl)
  let symbols_data = await symbols_res.json()
  symbols = Object.keys(symbols_data.symbols)
  for (const symbol of symbols) {
    let url = `https://api.exchangerate.host/latest?base=${symbol}`
    let res = await fetch(url)
    let data = await res.json()
    final_results.push({ key: symbol, data: data })
  }
  return {
    props: {
      final_results
    },
    revalidate: 60 * 60 * 6,
  }
}