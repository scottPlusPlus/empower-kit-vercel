export function overideTailwindCssClasses(
    original: string,
    overrides?: string
): string {
    if (!overrides || overrides.length  == 0){
        return original;
    }

    const classesOrig = original.split(" ");
    const classesOverrides = overrides.split(" ");

    const uniqueClassesOrig = classesOrig.filter((classNameOrig) => {
        const classNameOrigSplit = classNameOrig.split("-");
        return !classesOverrides.some((classNameOverride) =>
            classNameOverride.startsWith(classNameOrigSplit[0]) && classNameOverride.split("-").length == classNameOrigSplit.length
        );
    });

    const res = `${uniqueClassesOrig.join(" ")} ${overrides}`;
    return res;
}
