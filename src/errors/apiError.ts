export type ApiError = {
  message: string;
  status: number;
};

export function getErrorMessage(err: unknown): string {
  if (!err) return "Unknown error occurred";

  if (typeof err === "string") return err;

  if (typeof err === "object" && err !== null) {
    const e = err as any;
    return (
      e.message ||
      e.error?.message ||
      "Unexpected error occurred"
    );
  }

  return "Unexpected error occurred";
}