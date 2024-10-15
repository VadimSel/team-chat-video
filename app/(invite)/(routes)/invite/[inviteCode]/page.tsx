import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { currentProfile } from "@/lib/current-profile"

// Страница при присоединении к серверу

interface inviteCodePageProps {
  params: {
    inviteCode: string
  }
}

const inviteCodePage = async ({params}: inviteCodePageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  if (!params.inviteCode) {
    return redirect("/")
  }

  const existingServer = await db.server.findFirst({ // Проверка есть ли пользовател уже на этом сервере
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`) // Если пользователь есть на это сервере то перенаправляем на этот сервер
  }

  const server = await db.server.update({ // Логика при присоединении к новому серверу
    where: {
      inviteCode: params.inviteCode
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          }
        ]
      }
    }
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return null
}

export default inviteCodePage