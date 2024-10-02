import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"
import { NextResponse } from "next/server"
import { InitialModal } from "@/components/modals/initial-modal"

const SetupPage = async () => {
  const profile = await initialProfile()

  // Добавил по совету гпт, без этого ошибка
  if (profile instanceof NextResponse) {
    return profile
  }  
//--------------------------------

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return (
    <InitialModal/>
  )
}

export default SetupPage