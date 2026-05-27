export const useContent = () => {
  const fetchGuide = async (path: string) => {
    try {
      const { data } = await useAsyncData(`content-${path}`, () => {
        return queryCollection('content').path(path).first()
      })
      
      const guide = data.value
      if (guide) {
        // Try to fetch associated links.yaml
        const dir = path.substring(0, path.lastIndexOf('/'))
        const { data: linksData } = await useAsyncData(`links-${dir}`, () => {
          return queryCollection('content').path(`${dir}/links`).first()
        })
        
        if (linksData.value) {
          guide.externalLinks = linksData.value.links || []
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
