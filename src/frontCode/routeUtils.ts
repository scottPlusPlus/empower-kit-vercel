export function stringFromSearchParams(
    searchParams: Record<string, unknown> | null,
    key: string
): string | null {
    if (!searchParams) {
        return null;
    }

    try {
        var val = searchParams[key] as string;
        if (val) {
            val = val.trim().toLowerCase();
            if (val.length == 0) {
                return null;
            }
        }
        return val;
    } catch {
        return null;
    }
}
