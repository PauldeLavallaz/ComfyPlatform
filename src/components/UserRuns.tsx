"use client";

import { useEffect, useState } from "react";
import { ImageGenerationResult } from "./ImageGenerationResult";

interface Run {
	run_id: string;
	live_status?: string;
	image_url?: string;
	// ... otros campos si los hay
}

export function UserRuns({ deploymentId }: { deploymentId: string }) {
	const [runs, setRuns] = useState<Run[]>([]);
	
	useEffect(() => {
		// ... código existente de fetch ...
	}, [deploymentId]);

	return (
		<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{runs.map((run) => (
				<div key={run.run_id}>
					{run.image_url && (
						<ImageGenerationResult 
							imageUrl={run.image_url}
						/>
					)}
				</div>
			))}
		</div>
	);
}
