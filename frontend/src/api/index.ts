export const getModels = (parent?: number): Promise<Array<models.Models>> => {
  if (!parent) {
    return new Promise(
      (resolve) => {
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
      },
      /* resolve([
      {
        id: 1,
        name: 'Model1',
        finisingStitchFrequency: 5,
        stitchFrequency: 2,
        ageGroup: 'some age group',
        sizeGroup: 'some size group',
        isFolder: false,
      },
    ] as Array<models.Models>), */
    )
  } else
    return new Promise((resolve) => {
      setTimeout(() => resolve([] as Array<models.Models>), 1000)
    })
}
