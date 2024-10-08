import { db } from "@/app/db"
import { notFound } from "next/navigation"
import DesignConfigurator from "./DesignConfigurator"

interface pageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const page = async  ({ searchParams }: pageProps) => {
  const { id } = searchParams
  
  if (!id || typeof id !== 'string') return notFound()
  

  const configuration = await db.configuration.findUnique({
    where: {id}
  })

  if (!configuration) return notFound()

  const { imageUrl, width, height } = configuration
  
  return (
    <DesignConfigurator configId={configuration.id} imageUrl={imageUrl} imageDimensions={{width, height}} />
  )
}

export default page