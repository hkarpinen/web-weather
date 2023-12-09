export function capitalizeFirstLetterOfWord(word: string) {
    let firstLetter = word.charAt(0);
    let firstLetterCap = firstLetter.toUpperCase();
    let remainingLetters = word.slice(1);
    return firstLetterCap + remainingLetters;
}