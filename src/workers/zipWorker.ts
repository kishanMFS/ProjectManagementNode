import { parentPort, workerData } from 'worker_threads';
import fs from 'fs';
import path from 'path';
import * as archiver from 'archiver';

interface WorkerData {
  projectID: string;
  zipPath: string;
  files: {
    projectfilekey: string;
    projectfilename: string;
  }[];
}

const { files, zipPath } = workerData as WorkerData;

(async () => {
  try {
    const output = fs.createWriteStream(zipPath);

    const archive = new archiver.ZipArchive({
      zlib: { level: 9 },
    });

    let processed = 0;
    const total = files.length;

    output.on('close', () => {
      parentPort?.postMessage({
        status: 'COMPLETED',
        progress: 100,
      });
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    for (const file of files) {
      const filePath = path.join(process.cwd(), 'files', file.projectfilekey);

      if (fs.existsSync(filePath)) {
        archive.file(filePath, {
          name: file.projectfilename,
        });
      }

      processed++;

      parentPort?.postMessage({
        status: 'PROCESSING',
        progress: Math.round((processed / total) * 100),
      });
    }

    await archive.finalize();
  } catch (error) {
    console.log('zipworkers ', error);

    parentPort?.postMessage({
      status: 'FAILED',
      error: (error as Error).message,
    });
  }
})();
