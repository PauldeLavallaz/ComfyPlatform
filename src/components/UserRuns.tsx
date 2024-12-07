"use client";

import { getUserRuns } from "@/server/getUserRuns";
import useSWR from "swr";
import { ImageGenerationResult } from "./ImageGenerationResult";
import { ScrollArea } from "./ui/scroll-area";
import { ImageModal } from "./ImageModal";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface UserRunsProps {
	deploymentId?: string;
}

export function UserRuns({ deploymentId }: UserRunsProps) {
	const { data: userRuns } = useSWR("userRuns", getUserRuns, {
		refreshInterval: 5000,
		revalidateOnFocus: false,
		revalidateIfStale: false
	});
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	// Filtrar las imágenes por deploymentId si se proporciona
	const filteredRuns = deploymentId 
		? userRuns?.filter(run => run.deployment_id === deploymentId)
		: userRuns;

	// Show placeholder if there are no runs
	if (!filteredRuns || filteredRuns.length === 0) {
		return (
			<div className="w-full h-[50vh] flex flex-col items-center justify-center text-gray-400">
				<ImageIcon className="w-16 h-16 mb-4" />
				<p className="text-lg font-medium">No hay imágenes generadas</p>
				<p className="text-sm">Las imágenes que generes aparecerán aquí</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<ScrollArea className="h-full">
				<div className="grid grid-cols-2 gap-4">
					{filteredRuns.map((run) => (
						<div 
							key={run.run_id} 
							className="cursor-pointer"
							onClick={() => run.image_url && setSelectedImage(run.image_url)}
						>
							<ImageGenerationResult 
								runId={run.run_id}
								initialStatus={run.live_status || undefined}
								initialImageUrl={run.image_url || undefined}
							/>
						</div>
					))}
				</div>
			</ScrollArea>

			{selectedImage && (
				<ImageModal
					imageUrl={selectedImage}
					onClose={() => setSelectedImage(null)}
				/>
			)}
		</div>
	);
}
