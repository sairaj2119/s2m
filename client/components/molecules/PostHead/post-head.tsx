import Link from 'next/link'
import React from 'react'
import { SessionUser } from '../../../types/user'
import { Avatar } from '../../atoms/Avatar'
import { IconButton } from '../../atoms/IconButton'

export interface PostHeadProps {
  user: SessionUser
  moreIcon: typeof React.Component
  id: string
  caption?: string
}

export const PostHead = ({ user, id, moreIcon, caption }: PostHeadProps) => {
  return (
    <div>
      <div className="flex items-center justify-between px-2 py-2 border-b border-opacity-80">
        <div className="z-20 flex items-center">
          <Link href="/profile">
            <a className="flex items-center">
              <Avatar src={user.avatar} w="w-10" h="h-10" alt="user profile image" />
            </a>
          </Link>
          <div className="flex flex-col pl-2">
            <Link href="/profile">
              <a>
                <div className="flex items-center">
                  <a className="font-semibold leading-4 text-gray-800 cursor-pointer text-md hover:underline">
                    {user.displayName}
                  </a>
                  <div className="mx-1 text-base font-normal text-gray-600">·</div>
                  <a className="text-sm leading-5 text-gray-500 text-md">@{user.username}</a>
                </div>
              </a>
            </Link>
            <p className="text-xs leading-4 text-gray-500">2 min ago</p>
          </div>
        </div>
        <div className="z-10">
          <IconButton w="w-4" h="h-4" icon={moreIcon} />
        </div>
      </div>
      {caption && (
        <div className="flex px-2 py-2">
          <p className="items-end flex-1 text-base leading-6 text-gray-700">{caption}</p>
        </div>
      )}
    </div>
  )
}
