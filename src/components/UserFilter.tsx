'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './UserFilter.module.scss'

export default function UserFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [emailFilter, setEmailFilter] = useState(searchParams.get('email') || '')
  const [firstnameFilter, setFirstnameFilter] = useState(
    searchParams.get('firstname') || ''
  )
  const [lastnameFilter, setLastnameFilter] = useState(
    searchParams.get('lastname') || ''
  )

  useEffect(() => {
    const params = new URLSearchParams()
    if (emailFilter) params.set('email', emailFilter)
    if (firstnameFilter) params.set('firstname', firstnameFilter)
    if (lastnameFilter) params.set('lastname', lastnameFilter)

    const queryString = params.toString()
    router.push(`/users${queryString ? `?${queryString}` : ''}`, {
      scroll: false,
    })
  }, [emailFilter, firstnameFilter, lastnameFilter, router])

  const clearFilters = () => {
    setEmailFilter('')
    setFirstnameFilter('')
    setLastnameFilter('')
  }

  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.title}>Filter Users</h2>
      <div className={styles.filtersGrid}>
        <div className={styles.filterGroup}>
          <label htmlFor="email-filter" className={styles.label}>
            Email
          </label>
          <Input
            id="email-filter"
            type="text"
            placeholder="Filter by email..."
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="firstname-filter" className={styles.label}>
            First Name
          </label>
          <Input
            id="firstname-filter"
            type="text"
            placeholder="Filter by first name..."
            value={firstnameFilter}
            onChange={(e) => setFirstnameFilter(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="lastname-filter" className={styles.label}>
            Last Name
          </label>
          <Input
            id="lastname-filter"
            type="text"
            placeholder="Filter by last name..."
            value={lastnameFilter}
            onChange={(e) => setLastnameFilter(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
      {(emailFilter || firstnameFilter || lastnameFilter) && (
        <Button variant="outline" onClick={clearFilters} className={styles.clearButton}>
          Clear Filters
        </Button>
      )}
    </div>
  )
}

