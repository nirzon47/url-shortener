import { useState } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import axios from 'axios'

const App = () => {
	const [url, setURL] = useState<string>('')
	const [shortURL, setShortURL] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const handleLinkSubmission = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		const data = JSON.stringify([
			{
				URL: url,
			},
		])

		const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://localhost:6969/shortenURL',
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		}

		try {
			const response = await axios.request(config)
			console.log(JSON.stringify(response.data))
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
			<div className='h-screen w-screen grid place-content-center font-mono text-white bg-slate-900'>
				<div className='w-64 md:w-96 text-center'>
					<h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-6'>
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
						{!loading && shortURL && (
							<a href={shortURL} className='text-blue-300'>
								{shortURL}
							</a>
						)}
					</div>
				</div>
			</div>
		</ThemeProvider>
	)
}

export default App
