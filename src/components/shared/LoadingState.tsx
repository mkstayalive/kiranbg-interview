"use client";

import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Generating..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <Loader2 className="h-8 w-8 animate-spin text-blue-400 mb-4" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
