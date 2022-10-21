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
    if (fileName){
      const myFiles = await drive.files.list({
        pageSize: 1000,
        fields: 'nextPageToken, files(id, name, parents, webViewLink, iconLink, mimeType)',
        q: `name contains '${fileName}'`,
        supportsAllDrives: true, 
        includeItemsFromAllDrives: true
    })

    return myFiles.data.files
  } else {
      const myFiles = await drive.files.list({
        pageSize: 1000,
        fields: 'nextPageToken, files(id, name, parents, webViewLink, iconLink, mimeType)',
        q: `'1ppeC8JmV0WrVB5r2AvUtcijVGCNqQxXn' in parents`,
        supportsAllDrives: true, 
        includeItemsFromAllDrives: true
    })

    return myFiles.data.files
    }
  }
}
