export type Option = {
  value: string
  label: string
}

export type NavigationLink = {
  label: string
  href: string
  desktopOnly?: boolean
}

export type SiteContent = {
  brandName: string
  navigation: NavigationLink[]
}
