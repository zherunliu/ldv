interface IMenuItem {
  name: string
  icon: string
  url: string
  children?: IMenuItem[]
}

export type { IMenuItem }
