import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';

function checkSyntax(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules') {
                checkSyntax(fullPath);
            }
        } else if (file.endsWith('.js')) {
            try {
                const code = fs.readFileSync(fullPath, 'utf8');
                parse(code, {
                    sourceType: 'module',
                    plugins: ['jsx']
                });
                console.log(`PASS: ${fullPath}`);
            } catch (e) {
                console.error(`FAIL: ${fullPath}`);
                console.error(e.message);
            }
        }
    }
}

checkSyntax('c:/CAPSTONE_PROJECT/Backend');
