const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\\\Users\\\\MUJEEB\\\\.gemini\\\\antigravity-ide\\\\brain\\\\be8c2243-ba4f-40d9-bdf4-fd8f160734f3\\\\.system_generated\\\\logs\\\\transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let targetContent = '';
  for await (const line of rl) {
    try {
        const obj = JSON.parse(line);
        if (obj.type === 'TOOL_RESPONSE' && obj.content && obj.content.includes('The following changes were made by the multi_replace_file_content tool')) {
            targetContent = obj.content; // Keeps getting the latest one
        }
    } catch(e){}
  }
  fs.writeFileSync('diff_full.txt', targetContent);
}
processLineByLine();
