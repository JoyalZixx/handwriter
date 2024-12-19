let font = document.getElementById('fontSelection').value;

document.getElementById('download').addEventListener('click', () => {
    const a4sheet = document.getElementById('a4sheet');

    html2canvas(a4sheet, {
      backgroundColor: 'white',
      scale: 2 // Render at higher resolution for better quality
    }).then(canvas => {
      // Get canvas context
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
  
      // Apply a scanner filter overlay
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
  
      for (let i = 0; i < data.length; i += 4) {
        // Add more aggressive noise
        const noise = Math.random() * 20 - 10; // Random noise between -10 and 10
        data[i] = Math.min(255, Math.max(0, data[i] + noise));     // Red
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)); // Green
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)); // Blue
  
        // Stronger contrast boost
        data[i] = Math.min(255, data[i] * 1.15);
        data[i + 1] = Math.min(255, data[i + 1] * 1.15);
        data[i + 2] = Math.min(255, data[i + 2] * 1.15);
  
        // Slightly reduce brightness for darker effect
        data[i] = Math.max(0, data[i] - 5);
        data[i + 1] = Math.max(0, data[i + 1] - 5);
        data[i + 2] = Math.max(0, data[i + 2] - 5);
      }
  
      // Put the modified data back on the canvas
      ctx.putImageData(imageData, 0, 0);
  
      // Add a stronger gradient overlay for lighting effect
      const gradient = ctx.createLinearGradient(0, 0, 0, height); // Vertical gradient
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)'); // Darker top
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)'); // Light center
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)'); // Darker bottom
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
  
      // Save the final image
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg', 0.95); // High-quality JPEG 
      link.download = 'a4-scanned.jpeg';
      link.click();
    });
  });
  
  document.getElementById('inputText').addEventListener('input', () => {
    const a4sheet1 = document.getElementById('a4sheet');
    a4sheet1.innerHTML = document.getElementById('inputText').value;
  });

  document.getElementById('fontSelection').addEventListener('change', () => {
    let font = document.getElementById('fontSelection').value;
    switch (font) {
      case '1':
        document.querySelector('body').style.fontFamily = 'myfont1';
        break;
      case '2':
        document.querySelector('body').style.fontFamily = 'sue';
        break;
      default:
        document.querySelector('body').style.fontFamily = 'abdullahfont';
    }
});

  document.getElementById('fontSize').addEventListener('input', () => {
    let fontSizes = document.getElementById('fontSize').value;
    document.getElementById('a4sheet').style.fontSize = fontSizes + 'px';

});
