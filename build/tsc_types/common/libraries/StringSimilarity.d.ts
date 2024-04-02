export function compareTwoStrings(first: any, second: any): number;
export function findBestMatch(mainString: any, targetStrings: any): {
    ratings: {
        target: any;
        rating: number;
    }[];
    bestMatch: {
        target: any;
        rating: number;
    };
    bestMatchIndex: number;
};
