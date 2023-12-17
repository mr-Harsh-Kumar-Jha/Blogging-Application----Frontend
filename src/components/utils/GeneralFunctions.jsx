export function countWords(htmlContent) {
   // Remove HTML tags
   let cleanText = htmlContent.replace(/<[^>]*>/g, '');
   // Count words using regular expression
   let words = cleanText.match(/\b\w+\b/g);
   return words ? words.length : 0;
}

export function calculateReadingTime(htmlContent, wordsPerMinute = 200) {
   let wordCount = countWords(htmlContent);
   // Calculate reading time in minutes
   let readingTimeMinutes = wordCount / wordsPerMinute;
   return readingTimeMinutes;
}