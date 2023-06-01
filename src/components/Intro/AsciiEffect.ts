/**
 * Ascii generation is based on https://github.com/hassadee/jsascii/blob/master/jsascii.js
 *
 * 16 April 2012 - @blurspline
 *
 * Optimized to use canvas instead of table
 */

import type { Camera } from "@react-three/fiber";
import type { Scene, WebGLRenderer } from "three";

type Options = {
  resolution: number;
  scale: number;
  strResolution: "low" | "medium" | "high";
};

export class AsciiEffect {
  domElement: HTMLDivElement;
  render: (scene: Scene, camera: Camera) => void;
  setSize: (w: number, h: number) => void;

  constructor(
    renderer: WebGLRenderer,
    aCharList = [" ", "A"],
    options: Partial<Options> = {}
  ) {
    const fResolution = options["resolution"] || 0.15; // Higher for more details
    const iScale = options["scale"] || 1;
    // const bColor = options["color"] || false; // nice but slows down rendering!
    // const bAlpha = options["alpha"] || false; // Transparency
    // const bBlock = options["block"] || false; // blocked characters. like good O dos
    // const bInvert = options["invert"] || false; // black is white, white is black
    const strResolution = options["strResolution"] || "low";

    let width: number, height: number;

    const domElement = document.createElement("div");
    domElement.style.cursor = "default";

    this.domElement = domElement;

    const oAscii = document.createElement("canvas");
    domElement.appendChild(oAscii);

    const oAsciiCtx = oAscii.getContext("2d", {
      willReadFrequently: true,
    });

    let iWidth: number, iHeight: number;
    let oImg;

    this.setSize = function (w, h) {
      width = w;
      height = h;

      renderer.setSize(w, h);

      initAsciiSize();
    };

    this.render = function (scene, camera) {
      renderer.render(scene, camera);
      asciifyImage();
    };

    // Throw in ascii library from https://github.com/hassadee/jsascii/blob/master/jsascii.js (MIT License)

    function initAsciiSize() {
      iWidth = Math.floor(width * fResolution);
      iHeight = Math.floor(height * fResolution);

      oCanvas.width = iWidth;
      oCanvas.height = iHeight;

      oImg = renderer.domElement;

      oAscii.width = oImg.width * window.devicePixelRatio;
      oAscii.height = oImg.height * window.devicePixelRatio;

      if (!oAsciiCtx) return;

      oAsciiCtx.font = `${fFontSize}px SproutLogoGlyphA`;
    }

    const oCanvasImg = renderer.domElement;
    const oCanvas = document.createElement("canvas");
    if (!oCanvas.getContext) {
      return;
    }

    const oCtx = oCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!oCtx || !oCtx.getImageData) {
      return;
    }

    const fFontSize = (2 / fResolution) * iScale;
    const fLineHeight = (2 / fResolution) * iScale;
    let fLetterSpacing = 0;

    if (strResolution == "low") {
      switch (iScale) {
        case 1:
          fLetterSpacing = -1;
          break;
        case 2:
        case 3:
          fLetterSpacing = -2.1;
          break;
        case 4:
          fLetterSpacing = -3.1;
          break;
        case 5:
          fLetterSpacing = -4.15;
          break;
      }
    }

    if (strResolution == "medium") {
      switch (iScale) {
        case 1:
          fLetterSpacing = 0;
          break;
        case 2:
          fLetterSpacing = -1;
          break;
        case 3:
          fLetterSpacing = -1.04;
          break;
        case 4:
        case 5:
          fLetterSpacing = -2.1;
          break;
      }
    }

    if (strResolution == "high") {
      switch (iScale) {
        case 1:
        case 2:
          fLetterSpacing = 0;
          break;
        case 3:
        case 4:
        case 5:
          fLetterSpacing = -1;
          break;
      }
    }

    function asciifyImage() {
      if (!oAsciiCtx) return;
      if (!oCtx) return;

      oAsciiCtx.clearRect(0, 0, oAscii.width, oAscii.height);
      oCtx.clearRect(0, 0, iWidth, iHeight);
      oCtx.drawImage(oCanvasImg, 0, 0, iWidth, iHeight);
      // TODO: Read the rendered canvas directly
      // let width = oCanvasImg.width;
      // let height = oCanvasImg.height;
      // let gl = renderer.getContext();
      // let oImgData = new Uint8ClampedArray(width * height * 4);
      // gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, oImgData);

      const oImgData = oCtx.getImageData(0, 0, iWidth, iHeight).data;

      for (let y = 0; y < iHeight; y += 2) {
        for (let x = 0; x < iWidth; x += 2) {
          const iOffset = (y * iWidth + x) * 4;

          const iRed = oImgData[iOffset];
          const iGreen = oImgData[iOffset + 1];
          const iBlue = oImgData[iOffset + 2];
          const iAlpha = oImgData[iOffset + 3];

          let fBrightness = (0.3 * iRed + 0.59 * iGreen + 0.11 * iBlue) / 255;
          // fBrightness = (0.3*iRed + 0.5*iGreen + 0.3*iBlue) / 255;

          if (iAlpha === 0) {
            // should calculate alpha instead, but quick hack :)
            fBrightness *= iAlpha / 255;
            // fBrightness = 1;
          }

          const iCharIdx = fBrightness && 1;

          let currentChar = aCharList[iCharIdx];

          oAsciiCtx.fillStyle = `rgb(${Math.max(29, iRed)}, ${Math.max(
            29,
            iGreen
          )}, ${Math.max(29, iBlue)}, ${iAlpha / 255})`;
          // uncomment for debug mode
          // {
          //   oAsciiCtx.fillStyle = "rgb(255, 255, 255, 1)";
          //   currentChar = "A";
          // }

          const row = y / 2 + 1;
          const col = x / 2;

          oAsciiCtx.fillText(
            currentChar,
            col * fLineHeight + fLetterSpacing,
            row * fFontSize
          );
        }
      }
    }
  }
}
