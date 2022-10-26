export default class DriveServices {
  async getById(parentID: string): Promise<any> {
    const myFiles = await drive.files.list({
        pageSize: 1000,
        fields: 'nextPageToken, files(id, name, parents, webViewLink, iconLink, mimeType)',
        q: `'${parentID}' in parents`,
        supportsAllDrives: true, 
        includeItemsFromAllDrives: true
    })

    return myFiles.data.files
  }

  async get(fileName: string): Promise<any> {
    let driveFiles

    if (fileName){
      const myFiles = await drive.files.list({
        pageSize: 1000,
        fields: 'nextPageToken, files(id, name, parents, webViewLink, iconLink, mimeType)',
        q: `name contains '${fileName}'`,
        supportsAllDrives: true, 
        includeItemsFromAllDrives: true
    })
    
    driveFiles = []
    for (let file of myFiles.data.files){
      const parentName = await drive.files.get({
        fileId: file.parents[0],
        fields: 'name'
      })

      const newFile = {
        id: file.id,
        name: file.name,
        parents: {
          id: file.parents[0],
          name: parentName.data.name,
        },
        webViewLink: file.webViewLink,
        iconLink: file.iconLink,
        mimeType: file.mimeType,
      }

      driveFiles.push(newFile)
    }
  } else {
      const myFiles = await drive.files.list({
        pageSize: 1000,
        fields: 'nextPageToken, files(id, name, parents, webViewLink, iconLink, mimeType)',
        q: `'1ppeC8JmV0WrVB5r2AvUtcijVGCNqQxXn' in parents`,
        supportsAllDrives: true, 
        includeItemsFromAllDrives: true
    })

    driveFiles = myFiles.data.files
  }

  return driveFiles
  }
}
