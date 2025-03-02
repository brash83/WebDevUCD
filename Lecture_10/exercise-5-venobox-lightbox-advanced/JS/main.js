// Select all image-box elements
const imageBoxes = document.querySelectorAll('.image-box');

imageBoxes.forEach(box => {
  const link = document.createElement('a'); 
  link.classList.add('image-box-link');
  link.setAttribute('data-gall', 'gallery01');
  const img = box.querySelector('img'); 
  link.setAttribute('href', img.getAttribute('src')); 
  box.appendChild(link); 
  link.appendChild(img); 
});


new VenoBox({
  selector: '.image-box-link',
  numeration: true,
  infinigall: true,
  share: true,
  spinner: 'rotating-plane',
});
