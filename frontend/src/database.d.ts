declare namespace models {
  interface Dictionary {
    id: number
    name: string
    isFolder?: boolean
    parent?: number
  }
  interface Models extends Dictionary {
    finisingStitchFrequency?: number
    stitchFrequency?: number
    ageGroup?: string
    sizeGroup?: string
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
