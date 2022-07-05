import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

async function splitPdf(pathToPdf) {
    const docmentAsBytes = await fs.promises.readFile(pathToPdf);
    // Load your PDFDocument
    const pdfDoc = await PDFDocument.load(docmentAsBytes)
    const numberOfPages = pdfDoc.getPages().length;
    const subDocument = await PDFDocument.create();
    const subDocument2 = await PDFDocument.create();

    for (let i = 0; i < numberOfPages; i++) {
        // if (i < parseInt(numberOfPages / 2)) {
            if (i < 2) {
            // Create a new "sub" document
            const [copiedPage] = await subDocument.copyPages(pdfDoc, [i])
            // copy the page at current index
            subDocument.addPage(copiedPage);
            if (numberOfPages > 2) {
                if (i == 1) {
                    const pdfBytes = await subDocument.save()
                    await writePdfBytesToFile(`file-${1}.pdf`, pdfBytes);
                }
            }else{
                const pdfBytes = await subDocument.save()
                await writePdfBytesToFile(`file-${1}.pdf`, pdfBytes);
            }
            
        } else {
            // Create a new "sub" document
            const [copiedPage] = await subDocument2.copyPages(pdfDoc, [i])
            // copy the page at current index
            subDocument2.addPage(copiedPage);
            if (i == numberOfPages - 1) {
                const pdfBytes = await subDocument2.save()
                await writePdfBytesToFile(`file-${2}.pdf`, pdfBytes);
            }
        }

    }
}

async function writePdfBytesToFile(fileName, pdfBytes) {
    return fs.promises.writeFile(fileName, pdfBytes);
}

(async () => {
    await splitPdf("./epa_1986.pdf");
})();
