export const getImageColors = (imageSrc, numSections) => new Promise((resolve, reject) => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = `https://image.tmdb.org/t/p/w780${imageSrc}`;

  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const sectionWidth = Math.floor(canvas.width / numSections);
    const sectionHeight = Math.floor(canvas.height / numSections);
    const colors = [];

    for (let i = 0; i < numSections; i++) {
      for (let j = 0; j < numSections; j++) {
        const x = i * sectionWidth;
        const y = j * sectionHeight;
        const imageData = ctx.getImageData(x, y, sectionWidth, sectionHeight);
        const { data } = imageData;
        let r = 0;
        let g = 0;
        let b = 0;

        for (let k = 0; k < data.length; k += 4) {
          r += data[k];
          g += data[k + 1];
          b += data[k + 2];
        }

        const pixels = data.length / 4;
        const avgR = Math.floor(r / pixels);
        const avgG = Math.floor(g / pixels);
        const avgB = Math.floor(b / pixels);

        colors.push(`rgb(${avgR}, ${avgG}, ${avgB})`);
      }
    }

    resolve(colors);
  };

  img.onerror = (err) => {
    reject(err);
  };
});

