import { GroupIcon, InfoIcon, PlayIcon, PlusIcon } from '@/assets/icons'
import { appRouter } from '@/configs'
import { workSans } from '@/fonts'
import { IMedia } from '@/interfaces'
import { getImageUrl } from '@/utils/functions'
import { Skeleton, Tooltip } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export interface IMovieBoxs {
  loading: boolean
  data: IMedia[]
}

export function MovieBoxsPopover() { }

export function MovieBoxs({ loading, data }: IMovieBoxs) {
  const t = useTranslations('Tooltip')

  if (loading)
    return (
      <>
        {Array.from(Array(20).keys()).map((result) => (
          <Skeleton.Button
            key={result}
            className="aspect-[240/136] !h-auto !w-full"
            block
            active
          />
        ))}
      </>
    )

  if (!loading && data.length == 0) {
    return 'No result'
  }

  return (
    <>
      {data.map((result) => (
        <div key={result.id} className="relative aspect-[240/136] w-full">
          <div className="movie-box relative flex aspect-[240/136] w-full flex-col">
            <Image
              src={getImageUrl(result.backdrop_path)}
              alt={result.title || 'Untitled'}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 20vw"
              priority
              className="left-0 top-0 z-0 h-full w-full rounded-lg object-cover"
            />
            <div
              className="movie-card absolute left-1/2 top-1/2 z-10 flex h-[363px] w-[92vw] max-w-[329px] -translate-x-1/2 -translate-y-1/2 
            flex-col overflow-hidden rounded-lg border border-solid border-[#353843] bg-neutral600 shadow-[0px_4px_15px_0px_rgba(255,255,255,0.10)]"
            >
              <div
                className="movie-card__top flex h-[179px] w-[329px] items-end justify-center bg-[cover] bg-no-repeat"
                style={{
                  backgroundImage: `url('${getImageUrl(
                    result.backdrop_path,
                  )}')`,
                }}
              >
                <div
                  className="h-[169px] w-[331px] translate-y-px bg-[cover] bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(16, 17, 22, 0.00) 0%, #1A1D29 100%)`,
                  }}
                ></div>
              </div>
              <div className="movie-card__bottom mx-4 mb-4 flex flex-col">
                <div className="button-field mt-1 flex items-center">
                  <Tooltip
                    placement="top"
                    title={
                      <p
                        className={
                          'text-sm font-semibold text-neutral600 ' +
                          workSans.className
                        }
                      >
                        {t('Play')}
                      </p>
                    }
                    arrow={true}
                    color="white"
                  >
                    <Link
                      href={
                        `${appRouter.watch}?` +
                        new URLSearchParams({ v: result.id.toString() })
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1A1D29] hover:cursor-pointer"
                    >
                      <PlayIcon />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={
                      <p
                        className={
                          'text-sm font-semibold text-neutral600 ' +
                          workSans.className
                        }
                      >
                        {t('Group view')}
                      </p>
                    }
                    arrow={true}
                    color="white"
                  >
                    <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]">
                      <GroupIcon />
                    </div>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={
                      <p
                        className={
                          'text-sm font-semibold text-neutral600 ' +
                          workSans.className
                        }
                      >
                        {t('Add to my list')}
                      </p>
                    }
                    arrow={true}
                    color="white"
                  >
                    <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]">
                      <PlusIcon />
                    </div>
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    title={
                      <p
                        className={
                          'text-sm font-semibold text-neutral600 ' +
                          workSans.className
                        }
                      >
                        {t('Infomation')}
                      </p>
                    }
                    arrow={true}
                    color="white"
                  >
                    <Link
                      href={`${appRouter.detailInfo.index(result.id)}?media=${result.media_type
                        }`}
                      className="ml-4 flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-solid border-white bg-neutral600 text-white hover:cursor-pointer hover:bg-white hover:text-[#1A1D29]"
                    >
                      <InfoIcon />
                    </Link>
                  </Tooltip>
                </div>
                <div className="mt-4 flex items-center">
                  <div
                    className="h-6 w-6 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('/icons/movie.svg')` }}
                  ></div>
                  <Image
                    className="ml-[5px]"
                    src={'/images/ad.png'}
                    width={46}
                    height={24}
                    alt="ad"
                  />
                  <Image
                    className="ml-2"
                    src={'/images/cc.png'}
                    width={34}
                    height={24}
                    alt="cc"
                  />
                  <p className="ml-2 text-highEmphasis">
                    {result.release_date?.slice(0, 4)}
                  </p>
                </div>
                <p className="text-over-5 mt-3 text-xs text-mediumEmphasis">
                  {result.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
