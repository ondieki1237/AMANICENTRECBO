"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2 } from "lucide-react"

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [streamStatus, setStreamStatus] = useState("Ready to play")
  const [volume, setVolume] = useState(0.7)
  const [progressWidth, setProgressWidth] = useState(0)
  const [isLive, setIsLive] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set initial volume
    audio.volume = volume

    const handleLoadStart = () => {
      setStreamStatus("Loading stream...")
    }

    const handleCanPlay = () => {
      if (!isPlaying) {
        setStreamStatus("Ready to play")
      }
    }

    const handlePlaying = () => {
      setIsPlaying(true)
      setIsLoading(false)
      setStreamStatus("Live streaming")
      setIsLive(true)
      setProgressWidth(100)
    }

    const handlePause = () => {
      setIsPlaying(false)
      setStreamStatus("Paused")
      setIsLive(false)
      setProgressWidth(0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setStreamStatus("Stream ended")
      setIsLive(false)
      setProgressWidth(0)
    }

    const handleError = (e: Event) => {
      console.error("Audio error:", e)
      console.error("Audio error details:", audio.error)
      setIsPlaying(false)
      setIsLoading(false)
      setStreamStatus("Connection error - Click to retry")
      setIsLive(false)
      setProgressWidth(0)
    }

    const handleStalled = () => {
      setStreamStatus("Buffering...")
    }

    const handleWaiting = () => {
      setStreamStatus("Buffering...")
    }

    // Add event listeners
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("playing", handlePlaying)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("stalled", handleStalled)
    audio.addEventListener("waiting", handleWaiting)

    // Cleanup
    return () => {
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("playing", handlePlaying)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("stalled", handleStalled)
      audio.removeEventListener("waiting", handleWaiting)
    }
  }, [isPlaying, volume])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio || isLoading) return

    if (isPlaying) {
      audio.pause()
    } else {
      setIsLoading(true)
      setStreamStatus("Connecting...")

      try {
        audio.load() // Reload the stream
        await audio.play()
      } catch (error: any) {
        console.error("Playback failed:", error)
        setIsPlaying(false)
        setIsLoading(false)
        setIsLive(false)
        setProgressWidth(0)

        if (error.name === "NotAllowedError") {
          setStreamStatus("Click to allow audio playback")
        } else if (error.name === "NotSupportedError") {
          setStreamStatus("Stream format not supported")
        } else {
          setStreamStatus("Connection failed - Click to retry")
        }
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPlaying ? <Pause className="h-4 sm:h-5 w-4 sm:w-5" /> : <Play className="h-4 sm:h-5 w-4 sm:w-5" />}
          </button>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm sm:text-base">Live Stream</p>
            <p className="text-xs sm:text-sm text-gray-600">{streamStatus}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Volume2 className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full sm:w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            style={{
              background: `linear-gradient(to right, #dc2626 ${volume * 100}%, #e5e7eb ${volume * 100}%)`,
            }}
          />
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
        <div
          className={`bg-gradient-to-r from-red-600 to-emerald-600 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
            isLive ? "animate-pulse" : ""
          }`}
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>

      <audio ref={audioRef} preload="none" className="hidden" crossOrigin="anonymous">
        <source src="https://uk3-vn.mixstream.net/:8134/listen.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
