import * as FileSystem from "expo-file-system"

const PDF_URI = {
  JULIO_VERNE: "http://www.dominiopublico.gov.br/download/texto/eb000003.pdf"
}

const PDF_NAME = "doc.pdf"  


export const createPDF = async () => {
  const [isDownloading, setIsDownloading] = useState(false)
  
  try {
    setIsDownloading(true)

    const fileUri = FileSystem.documentDirectory + PDF_NAME
    const downloadResumable = FileSystem.createDownloadResumable(
      PDF_URI.JULIO_VERNE,
      fileUri,
      {}
    )

    const downloadResponse = await downloadResumable.downloadAsync()

    if(downloadResponse?.uri) {
      console.log(downloadResponse.uri)
    }

  } catch (error) {
    Alert.alert("Download", "Não foi possível fazer o download")
    console.log(error)
  }
};

