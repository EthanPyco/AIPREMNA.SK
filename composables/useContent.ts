export const useContent = () => {
  const fetchGuide = async (path: string) => {
    try {
      // Use queryCollection directly for dynamic fetching
      const guide = await queryCollection('content').path(path).first()
      
      if (guide) {
        // Try to fetch associated links
        const dir = path.substring(0, path.lastIndexOf('/'))
        const linksData = await queryCollection('content').path(`${dir}/links`).first()
        
        if (linksData) {
          guide.externalLinks = linksData.links || []
        }
      }
      return guide
    } catch (error) {
      console.error('Error fetching guide:', error)
      return null
    }
  }

  return {
    fetchGuide
  }
}
