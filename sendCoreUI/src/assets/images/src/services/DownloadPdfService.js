import baseAPI from 'src/api/userApi'
const getDownloadedPdf = async (filename) => {
  try {
    return await baseAPI.get(`/download/${filename}`)
  } catch (e) {
    console.log(e)
  }
}

const DownloadPdfService = {
  getDownloadedPdf,
}

export default DownloadPdfService
