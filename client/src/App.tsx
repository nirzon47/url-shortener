import { useState } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

const App = () => {
	const [shortURL, setShortURL] = useState<string>('https://google.com')
	const [loading, setLoading] = useState<boolean>(false)

	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<div className='h-screen w-screen grid place-content-center font-mono text-white bg-slate-900'>
				<div className='w-64 md:w-96 text-center'>
					<h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-6'>
						URL Shortener
					</h1>
					<form action='' className='grid mb-6'>
						<Input type='url' placeholder='Enter URL' className='mb-4' />
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
