"use client"

import { useEffect, useState } from "react"

interface Post {
  id: number
  title: string
  body: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts")

        if (!res.ok) {
          throw new Error("Failed to fetch posts")
        }

        const data: Post[] = await res.json()
        setPosts(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold mb-8">Posts</h1>
      <div className="flex flex-col gap-8 w-full max-w-2xl">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border border-gray-300 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2">{post.body}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
