export const getModels = (parent?: number): Promise<Array<models.Models>> => {
  if (!parent) {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve([
            {
              id: 2,
              name: 'root model folder1',
              isFolder: true,
            },
            {
              id: 3,
              name: 'root model folder2',
              isFolder: true,
            },
            {
              id: 4,
              name: 'root model folder3',
              isFolder: true,
            },
            {
              id: 1,
              name: 'Root Model1',
              finisingStitchFrequency: 5,
              stitchFrequency: 2,
              ageGroup: 'some age group',
              sizeGroup: 'some size group',
              isFolder: false,
            },
            {
              id: 5,
              name: 'Root Model2',
              finisingStitchFrequency: 3,
              stitchFrequency: 1,
              ageGroup: 'another age group',
              sizeGroup: 'another size group',
              isFolder: false,
            },
          ]),
        1000,
      )
    })
  } else if (parent === 2) {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve([
            {
              id: 6,
              name: 'level1 model folder1',
              isFolder: true,
            },
            {
              id: 7,
              name: 'level1 model folder2',
              isFolder: true,
            },

            {
              id: 8,
              name: 'Level1 Model1',
              finisingStitchFrequency: 5,
              stitchFrequency: 2,
              ageGroup: 'some age group',
              sizeGroup: 'some size group',
              isFolder: false,
            },
          ]),
        1000,
      )
    })
  } else
    return new Promise((resolve) => {
      setTimeout(() => resolve([] as Array<models.Models>), 1000)
    })
}
