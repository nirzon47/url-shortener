import { useState } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import axios from 'axios'
import { Skeleton } from './components/ui/skeleton'

const App = () => {
	const [url, setURL] = useState<string>('')
	const [shortURL, setShortURL] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const handleLinkSubmission = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		if (new URL(url).hostname === '') {
			alert('Invalid URL')
			return
		}

		const data = JSON.stringify([
			{
				URL: url,
			},
		])

		const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'https://url-shortener-izxd.onrender.com/shortenURL',
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		}

		try {
			const response = await axios.request(config)
			console.log(JSON.stringify(response.data))

			setShortURL(response.data)
		} catch (error) {
			console.log(error)
		}

		// setShortURL(data)
		setLoading(false)
	}

	const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setURL(e.target.value)
	}

	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<div className='grid w-screen h-screen font-mono text-white place-content-center bg-slate-900'>
				<div className='w-64 text-center md:w-96'>
					<h1 className='mb-6 text-2xl font-bold md:text-3xl lg:text-4xl'>
						URL Shortener
					</h1>
					<form className='grid mb-6' onSubmit={handleLinkSubmission}>
						<Input
							type='url'
							placeholder='Enter URL'
							className='mb-4'
							onChange={handleURLChange}
						/>
						<Button type='submit'>Get Short URL</Button>
					</form>
					<div className='h-4'>
						{loading && (
							<div className='flex items-center justify-between'>
								<Skeleton className='w-3/5 h-4' />
								<Skeleton className='w-1/5 h-4' />
							</div>
						)}
						{!loading && shortURL && (
							<div className='flex items-center justify-between'>
								<a
									href={`https://url-shortener-izxd.onrender.com/${shortURL}`}
									className='text-blue-300'
								>
									{`url-shortener-izxd.onrender.com/${shortURL}`}
								</a>
								<Button
									onClick={() =>
										navigator.clipboard.writeText(
											`https://url-shortener-izxd.onrender.com/${shortURL}`
										)
									}
								>
									Copy
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</ThemeProvider>
	)
}

export default App
