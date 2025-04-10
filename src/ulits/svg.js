import {readFileSync} from'fs';
import nodeHtmlToImage from 'node-html-to-image';

export default class Svg{
	#svgHTML;

	/**
	 * @param {string} svgFilePath
	 */
	constructor(
		svgFilePath
	){
		this.#loadSvg(svgFilePath);
	}

	/**
	 * @param {string} svgFilePath
	 */
	#loadSvg(svgFilePath){
		this.#svgHTML = readFileSync(svgFilePath).toString();
	}

	/**
	 * @param {string} fileName
	 * @param {Object} templateArguments
	 */
	saveAsJPG(fileName, templateArguments= {}){
		nodeHtmlToImage({
				quality: 100,
				output: './' + fileName,
				html: this.#svgHTML,
				content: templateArguments,
				puppeteerArgs: {
					defaultViewport: {
						width: 3840,
						height: 2160
					}
				}
			}).then(() => console.log('The image was created successfully!'))
	}
}
