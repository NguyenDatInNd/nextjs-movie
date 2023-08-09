export interface IMovieBox {
  id: number
  title: string
  backdrop_path: string
  overview: string
  release_date: string
}

export interface IGenres {
  id: number
  name: string
}

export interface IMovieDetail {
  id: number
  title: string
  backdrop_path: string
  overview: string
  genres: IGenres[]
}
