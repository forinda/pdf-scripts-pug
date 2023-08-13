import * as pug from "pug";
import puppeteer, { LaunchOptions, PDFOptions } from "puppeteer";
// import ejs,{Options,} from 'ejs';

namespace EnatonPDFMaker {
  export type TemplateOptions = pug.Options &
    pug.LocalsObject & {
      htmlTemplatePath?: string;
      htmlTemplateFn?: pug.compileTemplate;
      compiledStyle?: Buffer;
    };
  export interface GeneratePdfOptions {
    htmlTemplateFn?: pug.compileTemplate;
    htmlTemplatePath?: string;
    htmlTemplateOptions?: TemplateOptions;
    pdfOptions?: PDFOptions;
    puppeteerOptions?: LaunchOptions;
  }

  export const generatePdf = async (
    options: GeneratePdfOptions
  ): Promise<Buffer> => {
    // const options = Chroe
    const browser = await puppeteer.launch({
      ...options.puppeteerOptions,
      headless: true,
    });
    const page = await browser.newPage();
    let htmlTemplateOptions: TemplateOptions = {
      ...options.htmlTemplateOptions,
    };
    let renderedTemplate;

    if (options.htmlTemplateFn) {
      renderedTemplate = options.htmlTemplateFn(htmlTemplateOptions);
    } else if (options.htmlTemplatePath) {
      renderedTemplate = pug.renderFile(options.htmlTemplatePath, {
        ...htmlTemplateOptions,
        pretty: true,
      });
    } else {
      throw Error("htmlTemplateFn or htmlTemplatePath must be provided");
    }
    // console.log( {renderedTemplate});

    // Make puppeteer render the HTML from data buffer
    await page.setContent(renderedTemplate, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
    });

    const pdfBuffer = await page.pdf({ ...options.pdfOptions });

    await browser.close();

    return pdfBuffer;
  };
  export type GeneratePdf = typeof generatePdf;
  export interface PdfHtmlTemplateOptions extends TemplateOptions {}
}

export const generatePdf = EnatonPDFMaker.generatePdf;
export interface EnatonGeneratePdfOptions
  extends EnatonPDFMaker.GeneratePdfOptions {}
export type EnatonGeneratePdf = EnatonPDFMaker.GeneratePdf;
export interface EnatonPdfHtmlTemplateOptions
  extends EnatonPDFMaker.PdfHtmlTemplateOptions {}
// export type EnatonGeneratePdfOptions = PDFOptions

export default EnatonPDFMaker;
