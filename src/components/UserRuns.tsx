"use client";

import { getUserRuns } from "@/server/getUserRuns";
import useSWR from "swr";
import { ImageGenerationResult } from "./ImageGenerationResult";
import { ScrollArea } from "./ui/scroll-area";
import { ImageIcon } from "lucide-react";

interface Run {
	run_id: string;
	live_status?: string;
	image_url?: string;
	deployment_id?: string;
}

export function UserRuns({ deploymentId }: { deploymentId: string }) {
	const { data: userRuns } = useSWR("userRuns", getUserRuns, {
		refreshInterval: 5000,
		revalidateOnFocus: false,
		revalidateIfStale: false
	});

	// Filtrar las imágenes por deploymentId si se proporciona
	const filteredRuns = deploymentId 
		? userRuns?.filter(run => run.deployment_id === deploymentId)
		: userRuns;

	// Show placeholder if there are no runs
	if (!filteredRuns || filteredRuns.length === 0) {
		return (
			<div className="w-full max-w-2xl mx-auto px-4">
				<div className="bg-gray-50 rounded-lg border border-dashed border-gray-200 p-8 text-center">
					<div className="mx-auto w-12 h-12 mb-4 text-gray-400">
						<ImageIcon className="w-full h-full" />
					</div>
					<h3 className="text-lg font-medium text-gray-900 mb-1">
						No hay imágenes generadas
					</h3>
					<p className="text-gray-500">
						Usa el botón &ldquo;Generar&rdquo; para crear tu primera imagen con IA
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-2xl mx-auto px-4">
			<ScrollArea className="h-full">
				<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{filteredRuns.map((run) => (
						<div key={run.run_id}>
							{run.image_url && (
								<ImageGenerationResult 
									imageUrl={run.image_url}
								/>
							)}
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
