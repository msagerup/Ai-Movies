export const getTileColors = (theme) => {
  if (theme.palette.mode === 'dark') {
    return ['rgb(15,15,15)', 'rgb(20,20,20)', 'rgb(15,15,15)'];
  }

  // Light mode
  const colors = [
    'rgb(240, 240, 240)',
    'rgb(230, 230, 230)',
    'rgb(220, 220, 220)',
    'rgb(210, 210, 210)',
    'rgb(200, 200, 200)',
    'rgb(190, 190, 190)',
    'rgb(180, 180, 180)',
    'rgb(170, 170, 170)',
    'rgb(160, 160, 160)',
    'rgb(150, 150, 150)',
  ];

  const subtleColors = [
    'rgb(200, 220, 220)',
    'rgb(200, 220, 200)',
    'rgb(220, 200, 200)',
    'rgb(220, 220, 200)',
    'rgb(200, 200, 220)',
    'rgb(220, 200, 220)',
  ];

  const lightColors = [];

  for (let i = 0; i < 10; i++) {
    lightColors.push(colors[i]);
  }

  for (let i = 0; i < subtleColors.length; i++) {
    for (let j = 0; j < 3; j++) {
      lightColors.push(subtleColors[i]);
    }
  }

  return lightColors;
};
