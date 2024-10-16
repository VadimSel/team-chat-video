"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

// Логика полоски которая слева от квадратика, если на выбранном севрере одна полоска, если наводишь на не выбранный другая, и так далее. А так же самого квадратика, то что в нём картинка, то что это кнопка и тд

interface NavigationItemsProps {
	id: string;
	imageUrl: string;
	name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemsProps) => {
	const params = useParams();
	const router = useRouter();

	{/* при клике, перехд на нажатый сервер */}
  const onClick = () => {
    router.push(`/servers/${id}`)
  }

	return (
		<ActionTooltip side="right" align="center" label={name}>
			<button onClick={onClick} className="group relative flex items-center">
				<div
					className={cn(
						"absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
						params?.serverId !== id && "group-hover:h-[20px]",
						params?.serverId === id ? "h-[36px]" : "h-[8px]"
					)}
				/>
				<div
					className={cn(
						"relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
						params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
					)}
				>
					<Image fill src={imageUrl} alt="Channel" />
				</div>
			</button>
		</ActionTooltip>
	);
};
