import R from "ramda";

/**
 * hasPropertyAndNotEmpty checks property exists and not empty.
 * @param k
 * @param input
 */
export const hasPropertyAndNotEmpty = (k: string, input: any) => R.and(
    R.has(k)(input),
    R.propSatisfies(x => R.not(R.isEmpty(x)), k, input),
);

/**
 * notEmpty compose not and isEmpty.
 */
export const notEmpty = R.compose(R.not, R.isEmpty);
