declare namespace models {
  interface Dictionary {
    id: number
    name: string
  }
  interface Models extends Dictionary {
    finisingStitchFrequency?: number
    stitchFrequency?: number
    ageGroup?: string
    sizeGroup?: string
    isFolder?: boolean
    parent?: number
  }
  // alternatively we can (delete one of them)
  type Dictionary = {
    id: number
    name: string
  }
  type Fabrics = Dictionary & {
    ratio: number
  }
  type DictionaryType = Models | Fabrics
}
