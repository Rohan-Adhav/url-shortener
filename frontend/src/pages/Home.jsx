import { useState } from 'react'
import { shortenUrl, getStats } from '../services/api'
function Home() {

  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copy, setCopy] = useState(false)
  const [stats, setStats] = useState("")
  const [statsLoading, setStatsLoading] = useState(false)
  const [error, setError] = useState("")

  const handelChange = (e) => {
    setUrl(e.target.value)
    setShortUrl(null)
    setStats("")
    setError("")
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handelClick = async () => {
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL")
      return
    }
    try {
      setError("")
      setLoading(true)

      const res = await shortenUrl(url)
      const shortCode = res.shortCode;

      const baseUrl = import.meta.env.VITE_API_BASE_URL 
      const fullUrl = `${baseUrl}/${shortCode}`

      setShortUrl(fullUrl);
    } catch (error) {
      setError("Failed to shorten Url")
    } finally {
      setLoading(false)
    }
  };


  const copyFunction = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 2000);

  }

  const handelgetStats = async () => {
      if (!shortUrl) return
    try {
      setError("")
      setStatsLoading(true)
      const shortCode = shortUrl.split("/").pop()
      let res = await getStats(shortCode)
      setStats(res)
    } catch (error) {
      console.log(error.message)
      setError("Failed to fetch Stats")
    } finally {
      setStatsLoading(false)
    }
  }


  return (
    <>
      <main className='h-screen flex flex-col justify-center items-center gap-6'>

        <h1 className='text-4xl text-center text-gray-800 font-bold tracking-tight'>
          URL Shortener
        </h1>

        <div className="flex flex-col gap-2 bg-white p-6 rounded-lg shadow-md w-full max-w-sm">

          <label htmlFor="url"
            className='text-gray-700 font-medium'>
            Url
          </label>

          <input type="text"
            name="url"
            value={url}
            onChange={handelChange}
            id="url"
            placeholder='Paste your long URL here...'
            className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />

          {error && (
            <div className="text-red-500 text-sm mt-1">
              {error}
            </div>
          )}

          <button
            type='button'
            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95'
            onClick={handelClick}
            disabled={loading || !url}>
            {loading ? "Shortening..." : "Shorten Url"}
          </button>

          <div
            id="output"
            className="text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between gap-2"
          >

            <span className="break-all flex-1">
              {shortUrl ? shortUrl : "Short Url will appear here"}
            </span>

            {shortUrl && (
              <button
                className={`ml-2 px-3 py-1 text-sm rounded-lg font-medium transition-all duration-200 active:scale-95 ${copy
                  ? "bg-green-500 text-white hover:bg-green-600 shadow-md"
                  : "bg-blue-200 text-blue-800 hover:bg-blue-300 hover:shadow-md"
                  }`}
                onClick={copyFunction}
              >

                {copy ? "Copied!" : "Copy"}

              </button>
            )}

          </div>

          <button
            onClick={handelgetStats}
            disabled={!shortUrl}
            className={`mt-3 w-full py-2 rounded-lg transition-colors duration-200 ${shortUrl
              ? "bg-gray-800 text-white hover:bg-gray-900"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {statsLoading ? "Loading..." : "View Stats"}
          </button>

          {stats && (
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">

              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Stats
              </h2>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Original URL:</span>
                  <br />
                  <span className="break-all text-blue-600">{stats.originalUrl}</span>
                </p>

                <p>
                  <span className="font-medium">Clicks:</span> {stats.clicks}
                </p>

                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(stats.createdAt).toLocaleString()}
                </p>
              </div>

            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Home
