import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"

// Запрос профиля, что пользователь делающий какие либо операции именно тот пользователь, который должен быть

export const currentProfile = async () => {
  const {userId} = auth()

  if (!userId) {
    return null
  }

  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  })

  return profile
}