export default class DriveServices {
  async get(parentID: string): Promise<any> {
    const myFiles = await drive.files.list({
        pageSize: 1000,
        fields: 'nextPageToken, files(id, name, parents, webViewLink, iconLink, mimeType)',
        q: `'${parentID}' in parents`,
        supportsAllDrives: true, 
        includeItemsFromAllDrives: true
    })

    return myFiles.data.files
  }
}
