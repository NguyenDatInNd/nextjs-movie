import { toHoursAndMinutes } from '@/utils/functions'
import { Slider } from 'antd'
import { useRef, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'

export interface IVideoController {
  className?: string
}

let timer: NodeJS.Timeout

export function VideoPlayer({ className }: IVideoController) {
  const [playing, setPlaying] = useState(true)
  const [stashVolume, setStashVolume] = useState(1)
  const [volume, setVolume] = useState(1)
  const [seeking, setSeeking] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [loadedSeconds, setLoadedSeconds] = useState(0)
  const [duration, setDuration] = useState(0)

  const handle = useFullScreenHandle()

  const videoPlayerRef = useRef<ReactPlayer>(null)

  const handlePlayPause = () => {
    setPlaying((prev) => !prev)
  }

  const rewindHandler = () => {
    if (videoPlayerRef.current != null) {
      const newSecond = videoPlayerRef.current.getCurrentTime() - 10
      setPlayedSeconds(newSecond)
      videoPlayerRef.current.seekTo(newSecond)
    }
  }

  const fastFowardHandler = () => {
    if (videoPlayerRef.current != null) {
      const newSecond = videoPlayerRef.current.getCurrentTime() + 10
      setPlayedSeconds(newSecond)
      videoPlayerRef.current.seekTo(newSecond)
    }
  }

  const progressHandler = (state: OnProgressProps) => {
    if (!seeking) {
      setPlayedSeconds(state.playedSeconds)
      setLoadedSeconds(state.loadedSeconds)
    }
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  const handleSeek = (second: number) => {
    if (videoPlayerRef.current != null) {
      setPlayedSeconds(second)
      videoPlayerRef.current.seekTo(second, 'seconds')
    }
  }

  const handleChangeVolume = (volume: number) => {
    setVolume(volume / 20)
  }

  const handleClickVolume = () => {
    if (volume > 0) {
      setStashVolume(volume)
      setVolume(0)
    } else {
      setVolume(stashVolume)
    }
  }

  const handleFullscreen = () => {
    clearTimeout(timer)
    if (handle.active === false) {
      handle.enter()
    } else {
      handle.exit()
    }
  }

  const handleClickCenter = (e: React.MouseEvent<HTMLElement>) => {
    if (e.detail === 1) {
      timer = setTimeout(() => {
        setPlaying((prev) => !prev)
      }, 200)
    } else if (e.detail === 2) {
      handleFullscreen()
    }
  }

  return (
    <FullScreen handle={handle}>
      <div
        className={
          'video-player relative h-[80vh] w-full bg-black ' + className
        }
        style={handle.active ? { height: '100%' } : { height: '80vh' }}
      >
        <ReactPlayer
          className="absolute left-0 top-0"
          url="https://www.youtube.com/watch?v=_oOZG5-tqpA"
          width="100%"
          height="100%"
          playing={playing}
          ref={videoPlayerRef}
          onProgress={progressHandler}
          onDuration={handleDuration}
          volume={volume}
        />
        <div className="video-controller absolute left-0 top-0 flex h-full w-full flex-col items-center">
          <div className="video-controller__top mt-8 flex w-full items-center px-6">
            <button
              className="h-12 w-12 bg-cover bg-center bg-no-repeat"
              type="button"
              style={{ backgroundImage: `url('/icons/arrow-back.svg')` }}
            ></button>
            <div className="ml-6 flex flex-col">
              <div className="title text-[28px] font-bold">Loki</div>
              <div className="text-lg text-[rgba(255,255,255,0.80)]">
                T1:E1 Un glorioso propósito
              </div>
            </div>
          </div>
          <div
            className="video-controller__center w-full flex-grow"
            onClick={handleClickCenter}
          ></div>
          <div className="video-controller__bottom relative flex w-full flex-col">
            <div className="absolute bottom-0 left-0 z-0 h-[159px] w-full bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,_#000_100%)]"></div>
            <Slider
              className="video-controller__slider z-10 mx-6 my-0"
              max={Math.floor(duration)}
              value={playedSeconds}
              onChange={handleSeek}
            />
            <div className="z-10 flex h-[85px] w-full items-center justify-between px-6">
              <div className="video-controller__bottom__left flex items-center">
                <button
                  className="h-[37px] w-[37px] bg-cover bg-center bg-no-repeat"
                  type="button"
                  style={{ backgroundImage: `url('/icons/replay-10.svg')` }}
                  onClick={rewindHandler}
                />
                <button
                  className="ml-8 h-[37px] w-[37px] bg-cover bg-center bg-no-repeat duration-300"
                  type="button"
                  style={
                    playing
                      ? { backgroundImage: `url('/icons/pause.svg')` }
                      : { backgroundImage: `url('/icons/video-play.svg')` }
                  }
                  onClick={handlePlayPause}
                />
                <button
                  className="ml-8 h-[37px] w-[37px] bg-cover bg-center bg-no-repeat"
                  type="button"
                  style={{ backgroundImage: `url('/icons/forward-10.svg')` }}
                  onClick={fastFowardHandler}
                />
                <div className="volume-block ml-8 overflow-hidden">
                  <div className="flex w-[169px] items-center">
                    <button
                      className="h-[37px] w-[37px] bg-cover bg-center bg-no-repeat"
                      type="button"
                      style={{ backgroundImage: `url('/icons/volume.svg')` }}
                      onClick={handleClickVolume}
                    />
                    <Slider
                      className="volume-slider ml-4 w-[100px]"
                      max={20}
                      tooltip={{ open: false }}
                      value={volume * 20}
                      onChange={handleChangeVolume}
                    />
                  </div>
                </div>
                <span className="text-base">
                  <span className="inline-block min-w-[45px]">{`${toHoursAndMinutes(
                    Math.floor(playedSeconds),
                  )}`}</span>
                  <span className="ml-px mr-[2px]">/</span>
                  <span className="inline-block min-w-[45px]">{`${toHoursAndMinutes(
                    Math.floor(duration),
                  )}`}</span>
                </span>
              </div>
              <div className="video-controller__bottom__right flex items-center">
                <button
                  className="ml-8 h-[37px] w-[37px] bg-cover bg-center bg-no-repeat"
                  type="button"
                  style={{ backgroundImage: `url('/icons/fullscreen.svg')` }}
                  onClick={handleFullscreen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  )
}