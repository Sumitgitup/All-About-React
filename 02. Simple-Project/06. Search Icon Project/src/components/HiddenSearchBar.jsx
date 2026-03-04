import { useEffect, useMemo, useRef, useState } from 'react'
import { FaSearch, FaTimes, FaArrowRight } from 'react-icons/fa'
import '../index.css'

const sampleData = [
  'React hooks patterns',
  'JavaScript array methods',
  'CSS animation tricks',
  'Vite deployment guide',
  'Frontend accessibility checklist',
  'Reusable component architecture',
]

const HiddenSearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState([])

  const containerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleShortcut = (event) => {
      if (event.key === '/') {
        event.preventDefault()
        setIsOpen(true)
      }

      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleShortcut)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleShortcut)
    }
  }, [])

  const filteredResults = useMemo(() => {
    if (!query.trim()) return []

    return sampleData.filter((item) =>
      item.toLowerCase().includes(query.trim().toLowerCase())
    )
  }, [query])

  const submitSearch = (value) => {
    const cleanedValue = value.trim()
    if (!cleanedValue) return

    setSubmittedQuery(cleanedValue)
    setRecentSearches((prev) => [
      cleanedValue,
      ...prev.filter((item) => item.toLowerCase() !== cleanedValue.toLowerCase()),
    ].slice(0, 5))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitSearch(query)
  }

  const clearSearch = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  const applyRecentSearch = (value) => {
    setIsOpen(true)
    setQuery(value)
    setSubmittedQuery(value)
  }

  return (
    <section className={`search-page ${isOpen ? 'open' : ''}`}>
      <div className='search-card' ref={containerRef}>
        <button
          type='button'
          className='search-toggle'
          aria-label='Open search'
          onClick={() => setIsOpen(true)}
        >
          <FaSearch />
        </button>

        <form
          className={`search-form ${isOpen ? 'visible' : ''}`}
          onSubmit={handleSubmit}
        >
          <input
            ref={inputRef}
            type='text'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Search anything...'
            aria-label='Search input'
          />

          {query && (
            <button
              type='button'
              className='icon-btn clear-btn'
              aria-label='Clear search'
              onClick={clearSearch}
            >
              <FaTimes />
            </button>
          )}

          <button type='submit' className='icon-btn submit-btn' aria-label='Submit search'>
            <FaArrowRight />
          </button>
        </form>

        <p className='search-hint'>Press `/` to open and `Esc` to close</p>

        {submittedQuery && (
          <p className='search-status'>
            Showing results for: <strong>{submittedQuery}</strong>
          </p>
        )}

        {filteredResults.length > 0 && (
          <ul className='search-results'>
            {filteredResults.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {!filteredResults.length && query.trim() && (
          <p className='search-empty'>No matches found for "{query.trim()}"</p>
        )}

        {recentSearches.length > 0 && (
          <div className='recent-wrap'>
            <p>Recent searches</p>
            <div className='recent-list'>
              {recentSearches.map((item) => (
                <button
                  key={item}
                  type='button'
                  className='recent-chip'
                  onClick={() => applyRecentSearch(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default HiddenSearchBar
