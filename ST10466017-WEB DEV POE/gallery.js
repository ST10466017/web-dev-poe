// gallery.js — simple lightbox for gallery images
document.addEventListener('DOMContentLoaded', () => {
  const thumbs = document.getElementById('thumbs');
  if(!thumbs) return;

  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.position = 'fixed';
  lightbox.style.top = 0;
  lightbox.style.left = 0;
  lightbox.style.width = '100%';
  lightbox.style.height = '100%';
  lightbox.style.background = 'rgba(0,0,0,0.8)';
  lightbox.style.display = 'flex';
  lightbox.style.alignItems = 'center';
  lightbox.style.justifyContent = 'center';
  lightbox.style.padding = '1rem';
  lightbox.style.cursor = 'zoom-out';
  lightbox.style.zIndex = 9999;
  lightbox.style.visibility = 'hidden';
  lightbox.style.opacity = 0;
  lightbox.style.transition = 'opacity .25s ease';

  const img = document.createElement('img');
  img.style.maxWidth = '100%';
  img.style.maxHeight = '90%';
  img.style.borderRadius = '6px';
  lightbox.appendChild(img);
  document.body.appendChild(lightbox);

  thumbs.querySelectorAll('img').forEach(imgThumb=>{
    imgThumb.addEventListener('click', function(){
      img.src = this.dataset.full || this.src;
      img.alt = this.alt || '';
      lightbox.style.visibility = 'visible';
      lightbox.style.opacity = 1;
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.addEventListener('click', function(){
    lightbox.style.opacity = 0;
    setTimeout(()=>{
      lightbox.style.visibility = 'hidden';
      document.body.style.overflow = '';
      img.src = '';
    }, 250);
  });
});
