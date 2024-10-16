import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db" // импорт структуры базы данных

// Файл для загрузки и инициализации пользователя.

export const initialProfile = async () => {
  const user = await currentUser() // currentUser берётся из клерка (информация о логине пользователя)

  if (!user) {
    return redirectToSignIn()
  }

  const profile = await db.profile.findUnique({ // profile который после db берётся из схемы призмы
    where: {
      userId: user.id // строке userId из призмы, мы присваиваем user из currentUser, а дальше через точку указываем что именно из user берём
    }
  })

  if (profile) {
    return profile
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  })

  return newProfile
}